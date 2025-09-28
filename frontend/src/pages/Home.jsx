// src/pages/Home.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-8 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl font-extrabold">Monastery360</h1>
          <nav className="space-x-4">
            <Link
              to="/"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Explore
            </Link>
            <Link
              to="/events"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Events
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 md:px-0 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
            Explore the Monasteries of Sikkim
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            Immerse yourself in the rich culture, history, and spiritual beauty of Sikkim’s monasteries.
          </p>
        </div>

        {/* User Role Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {user ? (
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-800">
                Logged in as <span className="font-semibold">{user.email}</span> ({user.role})
              </p>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                >
                  Go to Admin Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="inline-block px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-6 mt-12 text-center">
        <p>© 2025 Monastery360 | In partnership with Sikkim Tourism</p>
        <p className="text-sm italic">“Where Nature Smiles”</p>
      </footer>
    </div>
  );
};

export default Home;
