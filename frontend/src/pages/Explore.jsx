// src/pages/Explore.jsx
import React from "react";
import MonasteryCard from "../components/MonasteryCard";

// Monasteries data (can be imported from a central file later)
const monasteries = [
  {
    name: "Pemayangtse Monastery",
    location: { lat: "27.32", lng: "88.24" },
    panoramas: {
      inside: "https://www.360cities.net/embed_iframe/pemayangste-monastery-in-sikkim?utm_source=360embed&utm_medium=embed&utm_campaign=onpage",
      outside: "https://www.360cities.net/embed_iframe/pemayangste-monastery-in-sikkim?utm_source=360embed&utm_medium=embed&utm_campaign=onpage",
    },
    description:
      "Pemayangtse Monastery, built in the 17th century, is one of the oldest and most important Nyingma monasteries in Sikkim. It was founded by Lhatsun Chenpo and serves as the seat of the Nyingma order.",
    audio: {
      hindi: "/assets/audio/pemayangtse-hindi.mp3",
      nepali: "/assets/audio/pemayangtse-nepali.mp3",
      english: "/assets/audio/pemayangtse-english.mp3",
    },
    archives: [
      { id: 1, title: "Ancient Tibetan Text 1", image: "/assets/images/monastery1.jpg" },
      { id: 2, title: "Buddhist Manuscript Archive", image: "/assets/images/monastery2.jpg" },
    ],
  },
  {
    name: "Rumtek Monastery",
    location: { lat: "27.33", lng: "88.61" },
    panoramas: {
      inside: "https://www.360cities.net/embed_iframe/6000x3000#275.40,-15.20,70.0",
      outside: "https://www.360cities.net/embed_iframe/rumtek-monastery-sikkim?utm_source=360embed&utm_medium=embed&utm_campaign=onpage",
    },
    description:
      "Rumtek Monastery is the largest monastery in Sikkim and is the seat of the Karmapa Lama. Originally built in the 16th century, it was reconstructed in the 1960s.",
    audio: {
      hindi: "/assets/audio/rumtek-hindi.mp3",
      nepali: "/assets/audio/rumtek-nepali.mp3",
      english: "/assets/audio/rumtek-english.mp3",
    },
    archives: [
      { id: 1, title: "Karmapa Texts", image: "/assets/images/rumtek1.jpg" },
      { id: 2, title: "Buddhist Sutras", image: "/assets/images/rumtek2.jpg" },
    ],
  },
  {
    name: "Tashiding Monastery",
    location: { lat: "27.15", lng: "88.33" },
    panoramas: {
      inside: "https://www.360cities.net/embed_iframe/sikkim-khecheopalri-lake-india",
      outside: "https://www.360cities.net/embed_iframe/tashiding-monastery-sikkim?utm_source=360embed&utm_medium=embed&utm_campaign=onpage",
    },
    description:
      "Tashiding Monastery is an important pilgrimage site in Sikkim, built in the 17th century. It is renowned for its sacred rituals and festivals.",
    audio: {
      hindi: "/assets/audio/tashiding-hindi.mp3",
      nepali: "/assets/audio/tashiding-nepali.mp3",
      english: "/assets/audio/tashiding-english.mp3",
    },
    archives: [
      { id: 1, title: "Tashiding Scrolls", image: "/assets/images/tashiding1.jpg" },
      { id: 2, title: "Buddhist Archives", image: "/assets/images/tashiding2.jpg" },
    ],
  },
];

const Explore = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">Explore Monasteries of Sikkim</h1>
        <p className="text-center text-gray-600 mb-10">
          Discover the rich spiritual heritage of Sikkim through interactive 360° views, history, audio narration, and ancient manuscripts.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {monasteries.map((m) => (
            <MonasteryCard key={m.name} monastery={m} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
