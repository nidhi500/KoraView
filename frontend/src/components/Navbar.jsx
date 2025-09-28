import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/">Monastery360</Link>
      <div className="flex gap-4">
        {user?.role === "admin" && <Link to="/admin">Dashboard</Link>}
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
