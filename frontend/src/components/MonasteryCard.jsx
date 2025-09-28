// src/components/MonasteryCard.jsx
import React, { useState } from "react";

/**
 * MonasteryCard
 * Props:
 *  - monastery : object (from MONASTERIES)
 *
 * Shows:
 *  - 360 viewer (iframe fallback)
 *  - Tabs: History / Audio / Manuscripts
 */

export default function MonasteryCard({ monastery }) {
  const [tab, setTab] = useState("history");
  const [viewing, setViewing] = useState("inside"); // inside/outside panorama toggle

  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      {/* Top area: responsive 360 viewer */}
      <div className="w-full h-64 md:h-72 bg-gray-900/5">
        {/* Showcase toggle between inside/outside */}
        <div className="flex items-center justify-end p-2 gap-2">
          <button
            onClick={() => setViewing("inside")}
            className={`text-sm px-3 py-1 rounded-full ${viewing === "inside" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 shadow"}`}
            aria-pressed={viewing === "inside"}
          >
            Inside
          </button>
          <button
            onClick={() => setViewing("outside")}
            className={`text-sm px-3 py-1 rounded-full ${viewing === "outside" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 shadow"}`}
            aria-pressed={viewing === "outside"}
          >
            Outside
          </button>
        </div>

        {/* Iframe embed of panorama viewer (Marzipano / A-Frame or a simple image viewer) */}
        <div className="w-full h-[calc(100%-48px)]">
          {/* Use an iframe to load a small local viewer HTML that uses Marzipano / A-Frame.
              Fallback to equirectangular image if you don't have viewer pages.
          */}
          {monastery.panoramas && monastery.panoramas[viewing] ? (
            <iframe
              title={`${monastery.name} 360 ${viewing}`}
              src={monastery.panoramas[viewing]}
              className="w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            // fallback: image (not interactive)
            <img
              src={monastery.thumbnail}
              alt={`${monastery.name} ${viewing}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{monastery.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{monastery.location?.lat}, {monastery.location?.lng}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTab("history")}
              className={`px-3 py-1 rounded-full text-sm ${tab === "history" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              History
            </button>
            <button
              onClick={() => setTab("audio")}
              className={`px-3 py-1 rounded-full text-sm ${tab === "audio" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Audio
            </button>
            <button
              onClick={() => setTab("archives")}
              className={`px-3 py-1 rounded-full text-sm ${tab === "archives" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Manuscripts
            </button>
          </div>

          <div className="mt-4">
            {tab === "history" && (
              <div className="prose max-w-none text-gray-700">
                <p>{monastery.description}</p>
              </div>
            )}

            {tab === "audio" && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-28 text-sm font-medium">English</div>
                  <audio controls className="flex-1" src={monastery.audio?.english}></audio>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 text-sm font-medium">Hindi</div>
                  <audio controls className="flex-1" src={monastery.audio?.hindi}></audio>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 text-sm font-medium">Nepali</div>
                  <audio controls className="flex-1" src={monastery.audio?.nepali}></audio>
                </div>
              </div>
            )}

            {tab === "archives" && (
              <div className="grid grid-cols-2 gap-3">
                {(monastery.archives || []).map(a => (
                  <div key={a.id} className="rounded overflow-hidden border">
                    <img src={a.image} alt={a.title} className="w-full h-28 object-cover" />
                    <div className="p-2 text-sm font-medium text-gray-800">{a.title}</div>
                  </div>
                ))}
                {(!monastery.archives || monastery.archives.length === 0) && (
                  <div className="text-gray-500">No manuscripts available yet.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
