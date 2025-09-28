import React from "react";
import { Link } from "react-router-dom";

export default function Hero({ onAdmin, onContributor }) {
  return (
    <section className="relative h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/hero_bg.jpg')" }}
        aria-hidden
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-indigo-900/30" />

      {/* content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="w-full md:w-7/12 text-white py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Monastery360
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-xl">
            “Where Nature Smiles” — walk the temples, hear the chants, and discover Sikkim’s living heritage from anywhere.
          </p>

          <div className="mt-8 flex gap-4">
            <button onClick={onAdmin} className="bg-yellow-400 text-indigo-900 font-semibold px-6 py-3 rounded-lg shadow hover:scale-[1.02] transition">
              I’m an Admin
            </button>
            <button onClick={onContributor} className="bg-transparent border border-white/60 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition">
              I’m a Contributor
            </button>
            <Link to="/explore" className="ml-4 inline-block text-white/90 underline">Start Exploring →</Link>
          </div>

          <div className="mt-8 text-sm font-bold text-white/80">Sponsored by Sikkim Tourism | Supported by Namgyal Institute of Tibetology</div>
        </div>

        {/* right column: role buttons or quick links */}
        <div className="hidden md:block w-5/12 pl-8">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm text-white">
            <h3 className="font-bold mb-2">Quick Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/monastery/rumtek" className="underline">Rumtek Monastery — 360° tour</Link></li>
              <li><Link to="/monastery/tashiding" className="underline">Tashiding — 360°</Link></li>
              <li><Link to="/calendar" className="underline">Upcoming Losar Festival</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
