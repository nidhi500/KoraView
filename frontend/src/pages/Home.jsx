import React, { useEffect, useState } from "react";
import { getMonasteries } from "../api/monasteryAPI";
import MonasteryCard from "../components/MonasteryCard";
import MapView from "../components/MapView";
import MonasteryModal from "../components/MonasteryModal";

function Home() {
  const [monasteries, setMonasteries] = useState([]);
  const [selected, setSelected] = useState(null); // for modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMonasteries();      // Axios response
        if (Array.isArray(res.data)) {
          setMonasteries(res.data);
        } else {
          console.error("Unexpected API response:", res.data);
          setMonasteries([]);
        }
      } catch (err) {
        console.error("Failed to fetch monasteries:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="relative bg-indigo-700 text-white h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url(/assets/images/hero_bg.jpg)" }}
        />
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            Monastery360
          </h1>
          <p className="mt-4 text-lg md:text-2xl drop-shadow">
            Explore Sikkim’s monasteries from home
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        {/* Featured Monasteries Grid */}
        <section className="my-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
            Featured Monasteries
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Array.isArray(monasteries) &&
              monasteries.map((m) => (
                <MonasteryCard
                  key={m.id}
                  monastery={m}
                  onClick={() => setSelected(m)}
                />
              ))}
          </div>
        </section>

        {/* Interactive Map */}
        <section className="my-12">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
            Explore on Map
          </h2>
          <div className="h-96 rounded-lg overflow-hidden shadow-lg">
            <MapView monasteries={monasteries} onSelect={setSelected} />
          </div>
        </section>
      </main>

      {/* Modal for 360° + Audio + Archives */}
      {selected && (
        <MonasteryModal monastery={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default Home;
