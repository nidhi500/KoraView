// src/pages/CulturalCalendar.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CulturalCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  useEffect(() => {
    setEvents([
      {
        id: "e1",
        name: "Losar (Tibetan New Year)",
        date: "2026-02-20",
        type: "festival",
        monastery: "Rumtek Monastery",
        description:
          "Losar is the Tibetan New Year celebrated with prayers, traditional dances, and local delicacies. Marks the beginning of the Tibetan calendar year.",
        images: [
          "/assets/images/losar.webp",
          "/assets/images/losar2.jpg"
        ]
      },
      {
        id: "e2",
        name: "Saga Dawa",
        date: "2026-05-15",
        type: "festival",
        monastery: "Tashiding Monastery",
        description:
          "Saga Dawa celebrates Buddha’s birth, enlightenment, and passing. Devotees perform rituals, offer prayers, and release animals as a gesture of compassion.",
        images: [
          "/assets/images/saga.jpg",
          "/assets/images/saga2.webp"
        ]
      },
      {
        id: "e3",
        name: "Drupka Teshi",
        date: "2026-07-10",
        type: "ritual",
        monastery: "Rumtek Monastery",
        description:
          "Drupka Teshi commemorates an important event in the life of Buddha. Monks perform ceremonies, chanting, and devotees gather to witness the rituals.",
        images: [
          "/assets/images/drukpa.jpg",
          "/assets/images/drukpa2.jpg"
        ]
      },
      {
        id: "e4",
        name: "Cham Dance Festival",
        date: "2026-03-05",
        type: "festival",
        monastery: "Pemayangtse Monastery",
        description:
          "Cham Dance is a sacred ritual dance performed by monks wearing elaborate masks. It symbolizes the triumph of good over evil.",
        images: [
          "/assets/images/cham_dance.webp",
          "/assets/images/cham_dance2.jpg"
        ]
      },
      {
        id: "e5",
        name: "Bhumchu Ceremony",
        date: "2026-09-12",
        type: "ritual",
        monastery: "Tashiding Monastery",
        description:
          "Bhumchu is a sacred ritual of filling and predicting the sacred water in a vase to determine the fortune of the kingdom and devotees.",
        images: [
          "/assets/images/bumchu.jpg",
          "/assets/images/bhumchu2.jpg"
        ]
      },
    ]);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    adaptiveHeight: true
  };

  const filteredEvents = events.filter((ev) => {
    const matchesType = selectedType === "all" || ev.type === selectedType;
    const matchesMonth =
      selectedMonth === "all" ||
      new Date(ev.date).getMonth() + 1 === Number(selectedMonth);
    return matchesType && matchesMonth;
  });

  const handleBook = (ev) => {
    alert(`Booking stub for ${ev.name} on ${ev.date}. Integrate payment gateway for real booking.`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center">
          Cultural Festivals & Rituals of Sikkim
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Filter Panel */}
          <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-lg sticky top-24 h-fit transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Filters</h3>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Event Type</label>
              <select
                className="w-full border rounded p-2 hover:border-indigo-500 transition"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="festival">Festival</option>
                <option value="ritual">Ritual</option>
                <option value="event">Event</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Month</label>
              <select
                className="w-full border rounded p-2 hover:border-indigo-500 transition"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="all">All</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i+1} value={i+1}>
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Event Cards */}
          <div className="md:w-3/4 grid gap-6">
            {filteredEvents.length === 0 && (
              <div className="text-gray-500 text-center mt-10">
                No events found for selected filters
              </div>
            )}

            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Date Badge */}
                <div className="absolute bg-indigo-600 text-white px-3 py-1 rounded-br-xl font-semibold z-10">
                  {new Date(ev.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                </div>

                {/* Carousel */}
                <div className="w-full h-64 md:h-80 relative">
                  <Slider {...sliderSettings}>
                    {ev.images.map((img, idx) => (
                      <div key={idx} className="w-full h-64 md:h-80">
                        <img
                          src={img}
                          alt={ev.name}
                          className="w-full h-full object-cover rounded-t-xl"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                {/* Event Details */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-semibold text-indigo-800">{ev.name}</h3>
                      <p className="text-sm text-gray-500">{ev.date}</p>
                      <p className="text-sm text-gray-600 italic mt-1">{ev.type} @ {ev.monastery}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mt-2">{ev.description}</p>

                  <button
                    onClick={() => handleBook(ev)}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded shadow-lg transition-transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalCalendar;
