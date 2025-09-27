from ultralytics import YOLO

# 1. Load a pretrained YOLOv8 model (nano version for speed)
model = YOLO("yolov8n.pt")  # you can also use yolov8s.pt, yolov8m.pt etc.

# 2. Train on your custom dataset
results = model.train(
    data="dataset/data.yaml",  # path to your data.yaml
    epochs=10,                 # number of training epochs
    imgsz=640,                 # image size
    batch=8,                  # batch size (adjust if GPU memory is small)
    device="cpu"
)

# 3. Save best model
model_path = "best.pt"
print(f"✅ Training complete. Model saved at: {model_path}")
