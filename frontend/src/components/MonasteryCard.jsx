export default function MonasteryCard({ monastery, onClick }) {
  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg group"
      onClick={onClick}
    >
      <img
        src={monastery.thumbnail}
        alt={monastery.name}
        className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition duration-300"></div>
      {/* Text overlay */}
      <div className="absolute bottom-4 left-4 text-white">
        <h2 className="font-bold text-xl">{monastery.name}</h2>
        <p className="text-sm">Lat: {monastery.location.lat}, Lng: {monastery.location.lng}</p>
      </div>
    </div>
  );
}
