"use client"

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

type Animal = {
  district: string,
  position: [number, number],
  gender: string
}

export default function MapComponent(props: { animals: Animal[] }) {
  const { animals } = props

  const defaultPosition: [number, number] = [23.0225, 72.5714]
  const defaultZoom = 7

  return (
    <MapContainer
      center={defaultPosition}
      zoom={defaultZoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {animals.map((animal, idx) => (
        <Marker key={idx} position={animal.position}>
          <Popup>
            <div>
              <p><strong>District:</strong> {animal.district}</p>
              <p><strong>Gender:</strong> {animal.gender}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

