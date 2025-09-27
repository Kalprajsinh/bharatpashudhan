from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import cv2
import os
from ultralytics import YOLO
import uuid
import torch
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
import base64

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Load YOLO for detection ------------------
detection_model = YOLO("yolov8n.pt")

# ------------------ Load Breed Classifier ------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
ckpt = torch.load("final_model.pt", map_location=device)
# Model was saved as dict with state_dict and class_names
model_state = ckpt["model_state_dict"] if "model_state_dict" in ckpt else ckpt["model_state"]
class_names = ckpt["class_names"]

# Rebuild architecture (must match training)
import timm
model = timm.create_model("efficientnet_b0", pretrained=False, num_classes=len(class_names))
model.load_state_dict(model_state)
model.to(device).eval()

# Transform used at validation/test time
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# ------------------ Paths ------------------
output_folder = r"C:\Users\Rana Kalpraj\Desktop\Project\Backend\separated_animals"
os.makedirs(output_folder, exist_ok=True)


import base64

@app.post("/detect_objects/")
async def detect_objects(file: UploadFile = File(...)):
    try:
        temp_filename = f"temp_{uuid.uuid4().hex}.jpg"
        temp_path = os.path.join(output_folder, temp_filename)
        with open(temp_path, "wb") as f:
            f.write(await file.read())

        img = cv2.imread(temp_path)
        if img is None:
            return JSONResponse(content={"error": "Could not read the uploaded image"}, status_code=400)

        results = detection_model(temp_path, conf=0.3)
        boxes = results[0].boxes

        if len(boxes) == 0:
            return JSONResponse(content={"message": "⚠ No objects found in the image"}, status_code=200)

        predictions = []
        crop_files = []  # track temporary crops

        for i, box in enumerate(boxes):
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy().astype(int)
            crop = img[y1:y2, x1:x2]
            crop_resized = cv2.resize(crop, (224, 224))

            crop_filename = f"crop_{uuid.uuid4().hex}.jpg"
            crop_path = os.path.join(output_folder, crop_filename)
            cv2.imwrite(crop_path, crop_resized)
            crop_files.append(crop_path)

            # ---- Classification ----
            pil_img = Image.fromarray(cv2.cvtColor(crop_resized, cv2.COLOR_BGR2RGB))
            x = transform(pil_img).unsqueeze(0).to(device)
            with torch.no_grad():
                out = model(x)
                probs = F.softmax(out, dim=1).cpu().numpy()[0]
            pred_idx = int(probs.argmax())
            conf = float(probs[pred_idx])

            predictions.append({
                "crop_file": crop_path,
                "predicted_breed": class_names[pred_idx],
                "confidence": round(conf, 4)
            })

        os.remove(temp_path)

        # ✅ Pick the best prediction
        best_prediction = max(predictions, key=lambda x: x["confidence"])

        for f in crop_files:
            if f != best_prediction["crop_file"]:
                os.remove(f)

        # ---- Convert best image to Base64 for frontend ----
        with open(best_prediction["crop_file"], "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode("utf-8")

        best_prediction["image_base64"] = encoded_image

        return {"result": best_prediction}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.get("/")
def root():
    return {"message": "Hello, World! FastAPI + YOLO + Breed Classifier is running 🚀"}
