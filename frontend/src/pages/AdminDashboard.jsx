import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [monasteries, setMonasteries] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMonasteries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/monasteries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMonasteries(data);
      } else {
        setError(data.message || "Failed to fetch monasteries");
      }
    } catch (err) {
      setError("Server error fetching monasteries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonasteries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/monasteries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setName("");
        fetchMonasteries();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to add monastery");
      }
    } catch (err) {
      alert("Server error adding monastery.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this monastery?"))
      return;

    try {
      const res = await fetch(`http://localhost:5000/monasteries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMonasteries(monasteries.filter((m) => m._id !== id));
      } else {
        alert("Failed to delete monastery");
      }
    } catch (err) {
      alert("Server error deleting monastery.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <p className="mb-6 text-gray-600">
        Welcome, <span className="font-semibold">{user?.email}</span>
      </p>

      {/* Add monastery */}
      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter monastery name"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* Loading & error */}
      {loading && <p>Loading monasteries...</p>}
      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
      )}

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {monasteries.length > 0 ? (
            monasteries.map((m, idx) => (
              <tr key={m._id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{m.name}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center text-gray-500 py-4 italic"
              >
                No monasteries added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
