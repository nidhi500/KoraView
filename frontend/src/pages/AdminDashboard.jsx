// src/components/AdminDashboard.jsx
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getMonasteries, approveMonastery } from "../api/monasteryAPI";

import {
  getContributions,
  approveContribution,
  rejectContribution,
} from "../api/contributionAPI";

Modal.setAppElement("#root"); // for accessibility

export default function AdminDashboard() {
  const [monasteries, setMonasteries] = useState([]);
  const [contributions, setContributions] = useState({
    monks: [],
    locals: [],
    researchers: [],
  });
  const [selectedContribution, setSelectedContribution] = useState(null);

  // Use the token from localStorage
  const token = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDgzNTRkNmM0ZmE0ODI0MjBmYjU0NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTE0OTUxNSwiZXhwIjoxNzU5NzU0MzE1fQ.KahPjSqmKIc5MGw3g1gB6fwkTxLmm3W_cGYEpo2onsA";

  useEffect(() => {
    fetchMonasteries();
    fetchContributions();
  }, []);

  const fetchMonasteries = async () => {
  try {
    const data = await getMonasteries();
    // make sure data is an array
    setMonasteries(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to fetch monasteries:", err);
    setMonasteries([]);
  }
};


  const fetchContributions = async () => {
    try {
      const res = await getContributions(token);
      setContributions(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveMonastery = async (id) => {
    await approveMonastery(id, token);
    fetchMonasteries();
  };

  const handleApproveContribution = async (id, type) => {
    await approveContribution(id, type, token);
    setContributions((prev) => ({
      ...prev,
      [type]: prev[type].map((c) => (c._id === id ? { ...c, approved: true } : c)),
    }));
  };

  const handleRejectContribution = async (id, type) => {
    await rejectContribution(id, type, token);
    setContributions((prev) => ({
      ...prev,
      [type]: prev[type].filter((c) => c._id !== id),
    }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Monasteries Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Monasteries</h2>
        <table className="w-full border shadow bg-white rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Approved</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {monasteries.map((m) => (
              <tr key={m._id}>
                <td className="border px-3 py-2">{m.name}</td>
                <td className="border px-3 py-2">{m.approved ? "✅ Yes" : "❌ No"}</td>
                <td className="border px-3 py-2">
                  {!m.approved && (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => handleApproveMonastery(m._id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Contributions Section */}
      {["monks", "locals", "researchers"].map((type) => (
        <section key={type} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 capitalize">{type} Contributions</h2>
          {contributions[type]?.length === 0 ? (
            <p className="text-gray-500">No pending {type} contributions.</p>
          ) : (
            <table className="w-full border shadow bg-white rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-3 py-2">Title</th>
                  <th className="border px-3 py-2">Submitted By</th>
                  <th className="border px-3 py-2">Approved</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {contributions[type].map((c) => (
                  <tr key={c._id}>
                    <td className="border px-3 py-2">{c.title}</td>
                    <td className="border px-3 py-2">{c.submittedBy}</td>
                    <td className="border px-3 py-2">{c.approved ? "✅ Yes" : "❌ No"}</td>
                    <td className="border px-3 py-2 flex gap-2">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => setSelectedContribution(c)}
                      >
                        View
                      </button>
                      {!c.approved && (
                        <>
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            onClick={() => handleApproveContribution(c._id, type)}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            onClick={() => handleRejectContribution(c._id, type)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}

      {/* Modal for full contribution preview */}
      {selectedContribution && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedContribution(null)}
          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedContribution.title}</h2>
          <p className="mb-4">{selectedContribution.description}</p>

          {/* Show uploaded files */}
          {selectedContribution.files?.map((f, idx) => (
            <div key={idx} className="mb-2">
              <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {f.name || "File"}
              </a>
            </div>
          ))}

          {/* Audio / Video */}
          {selectedContribution.audio && (
            <audio controls className="w-full mb-4">
              <source src={selectedContribution.audio} />
            </audio>
          )}
          {selectedContribution.video && (
            <video controls className="w-full mb-4">
              <source src={selectedContribution.video} />
            </video>
          )}

          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4"
            onClick={() => setSelectedContribution(null)}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}
