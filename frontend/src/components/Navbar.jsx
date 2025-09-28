import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <img src="/assets/images/logo192.png" alt="Monastery360" className="h-12 w-12 rounded" />
          <div>
            <div className="text-white font-bold text-xl">Monastery360</div>
            <div className="text-xs text-indigo-100">Explore Sikkim’s spiritual heritage</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-white">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/explore" className="hover:underline">Explore</Link>
          <Link to="/nearby" className="hover:underline">Nearby</Link>
          <Link to="/calendar" className="hover:underline">Cultural Calendar</Link>
          <Link to="/community" className="hover:underline">Community</Link>
          <Link to="/homestays" className="hover:underline">Homestays</Link>
          <Link to="/handicrafts" className="hover:underline">Handicrafts</Link>
          <Link to="/tours" className="hover:underline">Local Tours</Link>
          {user ? (
            <>
              <span className="px-3 py-1 bg-white/20 rounded text-sm">{user.role}</span>
              <button onClick={onLogout} className="ml-2 bg-white text-indigo-700 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-indigo-700 px-3 py-1 rounded">Login</Link>
          )}
        </nav>

        {/* Mobile menu (simple) */}
        <div className="md:hidden">
          <Link to="/login" className="bg-white text-indigo-700 px-3 py-1 rounded">Login</Link>
        </div>
      </div>
    </header>
  );
}
