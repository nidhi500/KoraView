// src/pages/Homestays.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const homestaysData = [
  {
    _id: 1,
    name: "Mimah Homestay",
    location: "Gangtok, East Sikkim",
    description:
      "Family-run homestay in Gangtok with wooden interiors and local charm, close to MG Marg and city center.",
    thumbnail:
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Mimah-Homestay-Gangtok.jpg",
    gallery: [
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Mimah-Homestay-Gangtok.jpg",
    ],
    pricePerNight: 1200,
    contact: "+91 9876543210",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 2,
    name: "Tara Homestay",
    location: "Pelling, West Sikkim",
    description:
      "Peaceful homestay above Pelling town with panoramic mountain views. Hosts offer guided walks and local meals.",
    thumbnail:
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Tara-Homestay-Pelling.jpg",
    gallery: [
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Tara-Homestay-Pelling.jpg",
    ],
    pricePerNight: 1500,
    contact: "+91 9876543211",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 3,
    name: "Sonam’s Homestay",
    location: "Lachung, North Sikkim",
    description:
      "Authentic village vibe run by an apple farmer. Guests can explore orchards and experience local culture.",
    thumbnail:
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Sonams-Homestay-Lachung.jpg",
    gallery: [
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Sonams-Homestay-Lachung.jpg",
    ],
    pricePerNight: 1800,
    contact: "+91 9876543212",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 4,
    name: "Yangsum Heritage Farmhouse",
    location: "Rinchenpong, West Sikkim",
    description:
      "A heritage farmhouse blending Sikkimese history with comfort. Organic farm meals and cultural shows available.",
    thumbnail:
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Yangsum-Heritage-Farmhouse-Rinchenpong.jpg",
    gallery: [
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Yangsum-Heritage-Farmhouse-Rinchenpong.jpg",
    ],
    pricePerNight: 2500,
    contact: "+91 9876543213",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 5,
    name: "Gonpad Lama’s Homestay",
    location: "Dzongu, North Sikkim",
    description:
      "Located in the Lepcha tribal region, offering immersive local experiences like cooking, foraging, and guided walks.",
    thumbnail:
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Gonpad-Lamas-Homestay-Dzongu.jpg",
    gallery: [
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Gonpad-Lamas-Homestay-Dzongu.jpg",
    ],
    pricePerNight: 2000,
    contact: "+91 9876543214",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 6,
    name: "Munsell Homestay",
    location: "Ravangla, South Sikkim",
    description:
      "Nestled in a spice & vegetable plantation, this homestay offers serenity, valley views, and home-cooked meals.",
    thumbnail:
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Munsell-Homestay-Ravangla.jpg",
    gallery: [
      "https://www.sikkimtourism.org/wp-content/uploads/2023/11/Munsell-Homestay-Ravangla.jpg",
    ],
    pricePerNight: 1600,
    contact: "+91 9876543215",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
];

export default function Homestays() {
  const [homestays] = useState(homestaysData);
  const [selected, setSelected] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openModal = (hs) => {
    setSelected(hs);
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
    setGalleryIndex(
      (i) => (i - 1 + selected.gallery.length) % selected.gallery.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative py-24 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/assets/images/homestay_hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700/80 via-orange-600/70 to-amber-800/80"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Discover Local Homestays / स्थानीय आवासहरू
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Stay with welcoming families, experience authentic Sikkimese culture, and support local
            communities. / आत्मीय परिवारसँग बस्नुहोस् र असली सिक्किमेली संस्कृति अनुभव गर्नुहोस्।
          </p>
          <button className="bg-white text-orange-700 font-semibold px-6 py-3 rounded-2xl shadow hover:bg-orange-100 transition">
            Explore Homestays
          </button>
        </div>
      </section>
        {/* Homestay Grid */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homestays.map((hs) => (
            <article
              key={hs._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="relative h-48">
                <img
                  src={hs.thumbnail}
                  alt={hs.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute left-3 top-3 bg-white/80 text-xs rounded px-2 py-1 font-medium text-gray-800">
                  {hs.location}
                </div>
                <div className="absolute right-3 top-3">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    {hs.approved ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {hs.name}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {hs.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700 font-medium">
                    ₹{hs.pricePerNight}{" "}
                    <span className="text-xs text-gray-500">/ night</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(hs)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
                    >
                      View
                    </button>
                    <a
                      href={`tel:${hs.contact.replace(/\s+/g, "")}`}
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


      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-6"
          aria-modal="true"
          role="dialog"
        >
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
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                        aria-label="Next image"
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
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-gray-700 mt-4">{selected.description}</p>

                <div className="mt-4">
                  <div className="text-sm text-gray-600">Price per night</div>
                  <div className="text-xl font-semibold">
                    ₹{selected.pricePerNight}
                  </div>
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

                <div className="mt-4 space-y-3">
                  {selected.audioGuides?.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Audio Guide
                      </div>
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
                      <div className="text-sm text-gray-600 mb-1">
                        Video Guide
                      </div>
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
                    Book Now
                  </a>
                  <button
                    onClick={() => alert("Request sent to host (demo)")}
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
