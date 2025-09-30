// src/pages/LocalTours.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "../components/Navbar";
import { Mountain, Calendar, MapPin, Book, Volume2 } from 'lucide-react';

/* =========================
   Utilities & Hooks
========================= */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(q.matches);
    onChange();
    if (q.addEventListener) q.addEventListener('change', onChange);
    else if (q.addListener) q.addListener(onChange);
    return () => {
      if (q.removeEventListener) q.removeEventListener('change', onChange);
      else if (q.removeListener) q.removeListener(onChange);
    };
  }, []);
  return reduced;
};

const useInView = (options = { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      options
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);
  return { ref, inView };
};

/* =========================
   Small Presentational Components
========================= */
const FadeUpSection = ({ children, className = '' }) => {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className={`${className} transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </section>
  );
};

const IconCard = ({ icon, title, desc }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`text-center px-6 py-8 rounded-2xl border border-amber-200/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } hover:shadow-md hover:-translate-y-0.5`}
      style={{ transitionDuration: '700ms' }}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 mx-auto mb-4 grid place-items-center shadow-inner">
        {icon}
      </div>
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
};

/* =========================
   Tours List
========================= */
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
    audioGuides: ["https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3"],
    videoGuides: ["https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4"],
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
    audioGuides: ["https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3"],
    videoGuides: ["https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4"],
  },
];

/* =========================
   Main Component
========================= */
export default function LocalTours() {
  const [selected, setSelected] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const heroWords = useMemo(() => ['Explore', 'Discover', 'Experience'], []);

  const openModal = (tour) => {
    setSelected(tour);
    setGalleryIndex(0);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };
  const nextImage = () => setGalleryIndex(i => (i + 1) % selected.gallery.length);
  const prevImage = () => setGalleryIndex(i => (i - 1 + selected.gallery.length) % selected.gallery.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/assets/images/hero_tours.jpg')", minHeight: '60vh' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/60 via-amber-800/50 to-orange-900/60"></div>
        <div className={`${reduced ? '' : 'animate-glowPulse'} absolute inset-0`} aria-hidden="true"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Local Tours in Sikkim</h2>
          <p className="text-2xl md:text-3xl mb-4 font-light">
            <span className="inline-block relative h-[1em] overflow-y-hidden">
              <span className="inline-block animate-wordSwap">{heroWords[0]}</span>
            </span>
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Handpicked tours across Sikkim — heritage walks, monasteries, villages, and Himalayan valleys.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <FadeUpSection className="py-16 container mx-auto px-6">
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
                  <div className="text-sm text-gray-700 font-medium">{tour.price}</div>
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
      </FadeUpSection>

      {/* Modal remains identical, unchanged */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-6">
          {/* ...Modal content same as your current implementation... */}
        </div>
      )}
    </div>
  );
}
