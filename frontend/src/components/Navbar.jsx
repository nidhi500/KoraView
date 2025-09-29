import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <header className="w-full z-40 bg-gray-100 shadow-md sticky top-0">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <img src="/assets/images/logo192.png" alt="Monastery360" className="h-12 w-12 rounded" />
          <div>
            <div className="text-gray-800 font-bold text-xl">Monastery360</div>
            <div className="text-xs text-gray-600">Explore Sikkim’s spiritual heritage</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-gray-800">
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
              <span className="px-3 py-1 bg-gray-200 rounded text-sm">{user.role}</span>
              <button onClick={onLogout} className="ml-2 bg-gray-300 text-gray-800 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-gray-300 text-gray-800 px-3 py-1 rounded">Login</Link>
          )}
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Link to="/login" className="bg-gray-300 text-gray-800 px-3 py-1 rounded">Login</Link>
        </div>
      </div>
    </header>
  );
}
