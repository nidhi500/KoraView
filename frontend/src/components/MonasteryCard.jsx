export default function MonasteryCard({ monastery, onClick }) {
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
      onClick={onClick}
    >
      <img src={monastery.thumbnail} alt={monastery.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{monastery.name}</h2>
        <p className="text-gray-600">
  Lat: {monastery.location.lat}, Lng: {monastery.location.lng}
</p>

      </div>
    </div>
  );
}
