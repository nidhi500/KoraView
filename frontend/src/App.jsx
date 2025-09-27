import { useState, useEffect } from "react";
import MonasteryCard from "./components/MonasteryCard";
import MonasteryModal from "./components/MonasteryModal";
import MapView from "./components/MapView";

function App() {
  const [monasteries, setMonasteries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/monasteries")
      .then(res => res.json())
      .then(data => setMonasteries(data));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
    <header className="relative bg-indigo-700 text-white h-96 flex items-center justify-center overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-70"
    style={{ backgroundImage: "url('/assets/images/hero_bg.jpg')" }}
  ></div>
  <div className="relative text-center px-4">
    <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
      Monastery360
    </h1>
    <p className="mt-4 text-lg md:text-2xl drop-shadow">
      Explore Sikkim’s monasteries from home
    </p>
  </div>
</header>




      <main className="container mx-auto p-4">
        {/* Grid of monasteries */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {monasteries.map(m => (
            <MonasteryCard
              key={m.id}
              monastery={m}
              onClick={() => setSelected(m)}
            />
          ))}
        </div>

        {/* Map */}
        <div className="mt-10 h-96">
          <MapView monasteries={monasteries} onSelect={setSelected} />
        </div>
      </main>

      {/* Modal */}
      {selected && (
        <MonasteryModal
          monastery={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default App;
