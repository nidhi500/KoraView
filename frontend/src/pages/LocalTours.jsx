// src/pages/LocalTours.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const tours = [
  {
    id: 1,
    name: "Gangtok City Heritage Tour",
    location: "Gangtok, East Sikkim",
    description:
      "Explore Gangtok’s heritage spots including Namgyal Institute of Tibetology, Do Drul Chorten Stupa, and MG Marg walk.",
    gallery: [
      "https://www.sikkimtourism.gov.in/uploads/places/namgyal-institute.jpg",
      "https://www.sikkimtourism.gov.in/uploads/places/do-drul-chorten.jpg",
      "https://www.sikkimtourism.gov.in/uploads/places/mg-marg-gangtok.jpg",
    ],
    price: "₹2500/person",
    contact: "+91 9876543210",
    audioGuides: [
      "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
    ],
    videoGuides: [
      "https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4",
    ],
  },
  {
    id: 2,
    name: "Tsomgo Lake & Baba Mandir Excursion",
    location: "East Sikkim",
    description:
      "Day trip to the sacred Tsomgo Lake and Baba Mandir, high-altitude marvels surrounded by snow peaks.",
    gallery: [
      "https://www.sikkimtourism.gov.in/uploads/places/tsomgo-lake.jpg",
      "https://www.sikkimtourism.gov.in/uploads/places/baba-mandir.jpg",
    ],
    price: "₹3500/person",
    contact: "+91 8765432109",
    audioGuides: [
      "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
    ],
    videoGuides: [
      "https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4",
    ],
  },
  // add other tours similarly...
];

export default function LocalTours() {
  const [selected, setSelected] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openModal = (tour) => {
    setSelected(tour);
    setGalleryIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

  const nextImage = () => {
    if (!selected) return;
    setGalleryIndex((i) => (i + 1) % selected.gallery.length);
  };

  const prevImage = () => {
    if (!selected) return;
    setGalleryIndex((i) => (i - 1 + selected.gallery.length) % selected.gallery.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 text-center">
          Local Tours in Sikkim
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Explore handpicked local tours across Sikkim — from heritage walks to monasteries, 
          cultural villages, and breathtaking Himalayan valleys.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <article
              key={tour.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="relative h-48">
                <img
                  src={tour.gallery[0]}
                  alt={tour.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute left-3 top-3 bg-white/80 text-xs rounded px-2 py-1 font-medium text-gray-800">
                  {tour.location}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{tour.name}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{tour.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700 font-medium">
                    {tour.price}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(tour)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
                    >
                      View
                    </button>
                    <a
                      href={`tel:${tour.contact.replace(/\s+/g, "")}`}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-6">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative z-50 w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left: Gallery */}
              <div className="md:w-1/2 bg-black/5">
                <div className="relative h-64 md:h-[420px] bg-gray-200">
                  <img
                    src={selected.gallery[galleryIndex]}
                    alt={`${selected.name} ${galleryIndex + 1}`}
                    className="object-cover w-full h-full"
                  />
                  {selected.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                      >
                        ‹
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
                {selected.gallery.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto">
                    {selected.gallery.map((g, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIndex(i)}
                        className={`w-20 h-12 shrink-0 rounded overflow-hidden border ${
                          i === galleryIndex
                            ? "border-indigo-600"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={g}
                          alt={`thumb-${i}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div className="md:w-1/2 p-6 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-indigo-800">
                      {selected.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selected.location}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-800 bg-gray-100 p-2 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-gray-700 mt-4">{selected.description}</p>

                <div className="mt-4">
                  <div className="text-sm text-gray-600">Price</div>
                  <div className="text-xl font-semibold">{selected.price}</div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-600">Contact</div>
                  <a
                    href={`tel:${selected.contact.replace(/\s+/g, "")}`}
                    className="text-indigo-600 font-medium"
                  >
                    {selected.contact}
                  </a>
                </div>

                {/* Audio / Video guides */}
                <div className="mt-4 space-y-3">
                  {selected.audioGuides?.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Audio Guide</div>
                      {selected.audioGuides.map((a, idx) => (
                        <audio key={idx} controls className="w-full mt-1">
                          <source src={a} />
                          Your browser does not support the audio element.
                        </audio>
                      ))}
                    </div>
                  )}

                  {selected.videoGuides?.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Video Guide</div>
                      {selected.videoGuides.map((v, idx) => (
                        <video key={idx} controls className="w-full rounded">
                          <source src={v} />
                          Your browser does not support the video tag.
                        </video>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-auto flex items-center gap-3 pt-6">
                  <a
                    href={`tel:${selected.contact.replace(/\s+/g, "")}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
                  >
                    Book Tour
                  </a>
                  <button
                    onClick={() => alert("Request sent to tour operator (demo)")}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Request Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
