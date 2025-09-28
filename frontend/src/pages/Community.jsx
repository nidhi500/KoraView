import React from "react";
import { Link } from "react-router-dom";

export default function Community() {
  return (
    <div className="min-h-screen p-8 bg-white">
      <h2 className="text-3xl font-bold mb-6">Community Contributions</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-indigo-50 rounded-lg">
          <h3 className="font-bold text-lg">Monks</h3>
          <p className="mt-2 text-gray-600">Upload ritual videos, chants, oral histories. Verify your monastery affiliation to contribute.</p>
          <Link to="/contribute/monk" className="inline-block mt-4 text-indigo-700 underline">Contribute</Link>
        </div>

        <div className="p-6 bg-green-50 rounded-lg">
          <h3 className="font-bold text-lg">Local</h3>
          <p className="mt-2 text-gray-600">Share homestay listings, handicrafts, stories and photos. Local contributions are moderated.</p>
          <Link to="/contribute/local" className="inline-block mt-4 text-green-700 underline">Contribute</Link>
        </div>

        <div className="p-6 bg-yellow-50 rounded-lg">
          <h3 className="font-bold text-lg">Researchers</h3>
          <p className="mt-2 text-gray-600">Upload scanned manuscripts, research notes, transcription help. Access controlled for sensitive material.</p>
          <Link to="/contribute/researcher" className="inline-block mt-4 text-yellow-700 underline">Contribute</Link>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <strong>Moderation / Verification:</strong> Contributor uploads are placed into a pending queue. Admins verify before publishing. Researchers can request access levels for sensitive manuscripts.
      </div>
    </div>
  );
}
