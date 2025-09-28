import { useEffect, useState } from "react";
import { getMonasteries, approveMonastery } from "../api/monasteryAPI";

export default function AdminDashboard() {
  const [monasteries, setMonasteries] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMonasteries();
  }, []);

  const fetchMonasteries = async () => {
    const res = await getMonasteries();
    setMonasteries(res.data || res);
  };

  const handleApprove = async (id) => {
    await approveMonastery(id, token);
    fetchMonasteries();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Approved</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {monasteries.map((m) => (
            <tr key={m._id}>
              <td className="border px-2 py-1">{m.name}</td>
              <td className="border px-2 py-1">{m.approved ? "Yes" : "No"}</td>
              <td className="border px-2 py-1">
                {!m.approved && (
                  <button
                    className="btn bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleApprove(m._id)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
