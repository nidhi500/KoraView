import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getMonasteries, approveMonastery } from "../api/monasteryAPI";
import {
  getContributions,
  approveContribution,
  rejectContribution,
} from "../api/contributionAPI";

Modal.setAppElement("#root");

export default function AdminDashboard() {
  const [monasteries, setMonasteries] = useState([]);
  const [contributions, setContributions] = useState({
    monks: [],
    locals: [],
    researchers: [],
  });
  const [selectedContribution, setSelectedContribution] = useState(null);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetchMonasteries();
    fetchContributions();
  }, []);

  const fetchMonasteries = async () => {
    try {
      const data = await getMonasteries();
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
      [type]: prev[type].map((c) =>
        c._id === id ? { ...c, approved: true } : c
      ),
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
    <div className="min-h-screen p-8 bg-gradient-to-b from-orange-50 to-amber-50">
      <h1 className="text-4xl font-bold text-orange-900 mb-10 drop-shadow-sm">
        Admin Dashboard
      </h1>
<section className="mb-16">
  <h2 className="text-2xl font-semibold text-orange-800 mb-6">
    Monasteries
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {monasteries.length === 0 && (
      <p className="text-gray-600 italic col-span-full">
        No monasteries found in database.
      </p>
    )}
    {monasteries.map((m) => (
      <div
        key={m._id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
      >
        {m.thumbnail && (
          <img
            src={m.thumbnail}
            alt={m.name}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-semibold text-orange-900">{m.name}</h3>
          <p className="text-gray-700">{m.description}</p>
          <p className="text-gray-500">
            Location: {m.location.lat}, {m.location.lng}
          </p>
          {m.archives?.length > 0 && (
            <div>
              <h4 className="font-semibold mt-2">Archives:</h4>
              {m.archives.map((file, idx) => (
                <a
                  key={idx}
                  href={file}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline block"
                >
                  {file.split("/").pop()}
                </a>
              ))}
            </div>
          )}
          {!m.approved && (
            <button
              onClick={() => handleApproveMonastery(m._id)}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
            >
              Approve
            </button>
          )}
          {m.approved && (
            <p className="text-green-700 font-semibold mt-2">✅ Approved</p>
          )}
        </div>
      </div>
    ))}
  </div>
</section>


      {/* ================= Contributions ================= */}
      {["monks", "locals", "researchers"].map((type) => (
        <section key={type} className="mb-16">
          <h2 className="text-2xl font-semibold text-orange-800 mb-6 capitalize">
            {type} Contributions
          </h2>
          {contributions[type]?.length === 0 ? (
            <p className="text-gray-600 italic">
              No pending {type} contributions.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contributions[type].map((c) => (
                <div
                  key={c._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
                >
                  <h3 className="text-xl font-semibold text-indigo-800">{c.title}</h3>
                  <p className="text-gray-700 mt-1">Submitted By: {c.submittedBy}</p>
                  {c.content && <p className="text-gray-600 mt-2">{c.content}</p>}

                  {c.files?.map((f, idx) => (
                    <a
                      key={idx}
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline block mt-1"
                    >
                      {f.name || "File"}
                    </a>
                  ))}

                  {c.audio && (
                    <audio controls className="w-full mt-2">
                      <source src={c.audio} />
                    </audio>
                  )}
                  {c.video && (
                    <video controls className="w-full mt-2 rounded-lg">
                      <source src={c.video} />
                    </video>
                  )}

                  <div className="flex gap-2 mt-4">
                    {!c.approved && (
                      <>
                        <button
                          onClick={() => handleApproveContribution(c._id, type)}
                          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectContribution(c._id, type)}
                          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {c.approved && (
                      <p className="text-green-700 font-semibold mt-2">✅ Approved</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
