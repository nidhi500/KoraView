import React, { useEffect, useState } from "react";

export default function CulturalCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // fetch from API (or use demo)
    fetch("http://localhost:5000/events")
      .then(r => r.json())
      .then(setEvents)
      .catch(() => {
        setEvents([
          { id: "e1", name: "Losar (Tibetan New Year)", date: "2026-02-20", type: "festival", monasteryId: "rumtek" },
          { id: "e2", name: "Saga Dawa", date: "2026-05-15", type: "festival", monasteryId: "tashiding" },
          { id: "e3", name: "Drupka Teshi", date: "2026-07-10", type: "ritual", monasteryId: "rumtek" }
        ]);
      });
  }, []);

  const handleBook = (evt) => {
    // open booking flow: integrate Stripe/Razorpay/PayPal; for demo open modal
    alert(`Booking stub for ${evt.name} on ${evt.date}. Integrate payment provider for real booking.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold mb-6">Cultural Calendar</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {events.map(ev => (
          <div key={ev.id} className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm uppercase text-indigo-600 font-semibold">{ev.type}</div>
            <h3 className="text-xl font-bold my-2">{ev.name}</h3>
            <p className="text-gray-600 mb-4">{ev.date}</p>
            <button onClick={()=>handleBook(ev)} className="bg-indigo-600 text-white px-4 py-2 rounded">Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}
