// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";

const monasteries = [
  {
    name: "Pemayangtse Monastery",
    iframeSrc:
      "https://www.360cities.net/embed_iframe/pemayangste-monastery-in-sikkim?utm_source=360embed&utm_medium=embed&utm_campaign=onpage",
    history:
      "Pemayangtse Monastery, built in the 17th century, is one of the oldest and most important Nyingma monasteries in Sikkim. It was founded by Lhatsun Chenpo and serves as the seat of the Nyingma order. Its name means 'Perfect Sublime Lotus'.",
    audioLinks: {
      hindi: "/assets/audio/pemayangtse-hindi.mp3",
      nepali: "/assets/audio/pemayangtse-nepali.mp3",
    },
    manuscripts: [
      { title: "Ancient Tibetan Text 1", link: "#" },
      { title: "Buddhist Manuscript Archive", link: "#" },
    ],
  },
  {
    name: "Rumtek Monastery",
    iframeSrc:
      "https://www.360cities.net/embed/6000x3000#275.40,-15.20,70.0",
    history:
      "Rumtek Monastery is the largest monastery in Sikkim and is the seat of the Karmapa Lama. It was originally built in the 16th century and reconstructed in 1960s.",
    audioLinks: {
      hindi: "/assets/audio/rumtek-hindi.mp3",
      nepali: "/assets/audio/rumtek-nepali.mp3",
    },
    manuscripts: [
      { title: "Karmapa Texts", link: "#" },
      { title: "Buddhist Sutras", link: "#" },
    ],
  },
  {
    name: "Tashiding Monastery",
    iframeSrc:
      "https://www.360cities.net/image/sikkim-khecheopalri-lake-india#706.90,-71.57,70.0",
    history:
      "Tashiding Monastery is an important pilgrimage site in Sikkim, built in the 17th century. It is renowned for its sacred rituals and festivals.",
    audioLinks: {
      hindi: "/assets/audio/tashiding-hindi.mp3",
      nepali: "/assets/audio/tashiding-nepali.mp3",
    },
    manuscripts: [
      { title: "Tashiding Scrolls", link: "#" },
      { title: "Buddhist Archives", link: "#" },
    ],
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/hero_bg.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Explore Sikkim’s Monasteries</h1>
          <p className="text-xl md:text-2xl italic mb-6">“Where Nature Smiles” - Experience the spiritual heart of Sikkim</p>
          <div className="space-x-4">
            <button className="bg-indigo-700 hover:bg-indigo-600 px-6 py-3 rounded-lg font-semibold shadow-lg">Admin</button>
            <button className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg font-semibold shadow-lg">Contributor</button>
          </div>
        </div>
      </section>

      {/* Featured Monasteries */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-10">Featured Monasteries</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {monasteries.map((m) => (
            <div key={m.name} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              {/* 360° View */}
              <div className="w-full h-64">
                <iframe
                  title={m.name}
                  src={m.iframeSrc}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">{m.name}</h3>
                {/* Tabs */}
                <div className="mt-2 space-y-2">
                  {/* History */}
                  <details className="border rounded-lg p-3 hover:bg-gray-50">
                    <summary className="font-medium cursor-pointer">History</summary>
                    <p className="mt-2 text-gray-700">{m.history}</p>
                  </details>

                  {/* Audio */}
                  <details className="border rounded-lg p-3 hover:bg-gray-50">
                    <summary className="font-medium cursor-pointer">Audio Narration (Hindi/Nepali)</summary>
                    <div className="mt-2 flex flex-col space-y-2">
                      <audio controls>
                        <source src={m.audioLinks.hindi} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                      <audio controls>
                        <source src={m.audioLinks.nepali} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </details>

                  {/* Manuscripts */}
                  <details className="border rounded-lg p-3 hover:bg-gray-50">
                    <summary className="font-medium cursor-pointer">Manuscripts / Archives</summary>
                    <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                      {m.manuscripts.map((man, idx) => (
                        <li key={idx}>
                          <a href={man.link} className="text-indigo-600 hover:underline">{man.title}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
