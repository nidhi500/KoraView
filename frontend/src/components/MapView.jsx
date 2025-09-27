import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ monasteries, onSelect }) {
  return (
    <MapContainer
      center={[27.33, 88.5]}
      zoom={10}
      className="h-full w-full rounded"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {monasteries.map(m => (
        <Marker
          key={m.id}
          position={[m.location.lat, m.location.lng]}
          eventHandlers={{ click: () => onSelect(m) }}
        >
          <Popup>{m.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
