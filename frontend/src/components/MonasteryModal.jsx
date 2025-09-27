import { Dialog } from "@headlessui/react";
import ReactPlayer from "react-player";

export default function MonasteryModal({ monastery, onClose }) {
  return (
    <Dialog open={true} onClose={onClose} className="fixed z-10 inset-0">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <Dialog.Panel className="bg-white rounded-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
  <button
    className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
    onClick={onClose}
  >
    ✕
  </button>
  <h2 className="text-3xl font-bold mb-4">{monastery.name}</h2>
  <p className="mb-4 text-gray-700">{monastery.description}</p>

  {/* 360° viewer with shadow */}
  {monastery.tour360 && (
    <div className="mb-4 shadow-lg rounded overflow-hidden">
      <ReactPlayer
        url={monastery.tour360}
        controls
        width="100%"
        height="400px"
      />
    </div>
  )}

  {/* Audio buttons */}
  <div className="flex gap-4 mb-4">
    {monastery.audio && (
      <>
        <audio controls src={monastery.audio.english}></audio>
        <audio controls src={monastery.audio.nepali}></audio>
      </>
    )}
  </div>

  {/* Archives gallery */}
  <div className="grid md:grid-cols-2 gap-4">
    {monastery.archives?.map(a => (
      <div key={a.id} className="rounded overflow-hidden shadow hover:shadow-lg transition">
        <img src={a.image} alt={a.title} className="w-full h-48 object-cover" />
        <p className="p-2 text-gray-700">{a.title}</p>
      </div>
    ))}
  </div>
</Dialog.Panel>

      </div>
    </Dialog>
  );
}
