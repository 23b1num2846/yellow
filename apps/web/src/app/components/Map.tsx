"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({ iconUrl: "/static/pin.png", iconSize: [32, 32] });

export default function Map({ points }: { points: { name: string; lat: number; lng: number; }[] }) {
  const center = points[0] ?? { lat: 47.9185, lng: 106.9170, name: "Ulaanbaatar" };
  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden shadow">
      <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' />
        {points.map((p, i) => (
          <Marker position={[p.lat, p.lng]} icon={icon} key={i}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
