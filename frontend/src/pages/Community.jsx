// src/pages/Community.jsx
import React, { useState } from "react";
import { FaUserNinja, FaUsers, FaBook } from "react-icons/fa"; 
import Navbar from "../components/Navbar";
import { FaTimes } from "react-icons/fa";

export default function Community() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({});
  const [filePreview, setFilePreview] = useState(null);

  const communityRoles = [
    { 
      role: "Monk", 
      color: "bg-indigo-100", 
      icon: <FaUserNinja size={40} className="text-indigo-600" />,
      description: "Monks can contribute ritual videos, chants, and oral histories. Verified contributions help preserve Sikkim's spiritual heritage and guide tourists in understanding traditions." 
    },
    { 
      role: "Local", 
      color: "bg-green-100", 
      icon: <FaUsers size={40} className="text-green-600" />,
      description: "Local residents can share homestay listings, handicrafts, personal stories, and photographs. These contributions connect visitors with authentic Sikkim experiences." 
    },
    { 
      role: "Researcher", 
      color: "bg-yellow-100", 
      icon: <FaBook size={40} className="text-yellow-600" />,
      description: "Researchers can upload scanned manuscripts, research notes, or transcription work. These help document cultural heritage and provide educational resources for the public." 
    }
  ];

  const openModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
    setFormData({});
    setFilePreview(null);
  };

  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFilePreview(reader.result);
    reader.readAsDataURL(file);
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", selectedRole, formData);
    alert(`Submitted contribution for ${selectedRole}. It will appear in the gallery after review.`);
    closeModal();
  };

  const renderFormFields = () => {
    switch (selectedRole) {
      case "Monk":
        return (
          <>
            <input required name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500" />
            <select required name="monastery" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500">
              <option value="">Select Monastery</option>
              <option value="Rumtek">Rumtek</option>
              <option value="Pemayangtse">Pemayangtse</option>
              <option value="Tashiding">Tashiding</option>
              <option value="Enchey">Enchey</option>
            </select>
            <input required name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500" />
            <select required name="contributionType" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500">
              <option value="">Contribution Type</option>
              <option value="Ritual Video">Ritual Video</option>
              <option value="Chant Audio">Chant Audio</option>
              <option value="Oral History">Oral History</option>
            </select>
            <input type="file" accept="video/*,audio/*,.txt" onChange={handleFileChange} className="w-full mb-2" />
            <textarea placeholder="Additional Notes" name="notes" onChange={handleChange} className="w-full border rounded-lg p-3" />
          </>
        );
      case "Local":
        return (
          <>
            <input required name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-green-500" />
            <select required name="town" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-green-500">
              <option value="">Select Town/Village</option>
              <option value="Gangtok">Gangtok</option>
              <option value="Pelling">Pelling</option>
              <option value="Namchi">Namchi</option>
              <option value="Gyalshing">Gyalshing</option>
            </select>
            <input required name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-green-500" />
            <select required name="contributionType" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-green-500">
              <option value="">Contribution Type</option>
              <option value="Homestay">Homestay</option>
              <option value="Handicraft">Handicraft</option>
              <option value="Story">Story</option>
              <option value="Photo">Photo</option>
            </select>
            <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="w-full mb-2" />
            <textarea placeholder="Additional Notes" name="notes" onChange={handleChange} className="w-full border rounded-lg p-3" />
          </>
        );
      case "Researcher":
        return (
          <>
            <input required name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-yellow-500" />
            <input required name="institution" placeholder="Institution/Affiliation" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-yellow-500" />
            <input required name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-yellow-500" />
            <select required name="contributionType" onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-yellow-500">
              <option value="">Contribution Type</option>
              <option value="Manuscript Scan">Manuscript Scan</option>
              <option value="Research Notes">Research Notes</option>
              <option value="Transcription">Transcription</option>
            </select>
            <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="w-full mb-2" />
            <textarea placeholder="Additional Notes" name="notes" onChange={handleChange} className="w-full border rounded-lg p-3" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-10 text-center text-indigo-700">
          Community Contributions
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {communityRoles.map(({ role, color, icon, description }) => (
            <div key={role} className={`p-6 rounded-lg shadow-lg ${color} hover:shadow-2xl transition transform hover:-translate-y-1`}>
              <div className="flex items-center gap-4 mb-4">
                {icon}
                <h3 className="text-2xl font-bold">{role}</h3>
              </div>
              <p className="text-gray-700 mb-4">{description}</p>
              <button
                onClick={() => openModal(role)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded shadow"
              >
                Contribute
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <strong>Note:</strong> All contributions are reviewed by our team. Once approved, they will appear in the public gallery for tourists and locals to explore and engage with Sikkim’s rich heritage.
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 md:w-1/2 p-6 max-h-[90vh] overflow-y-auto relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FaTimes className="text-xl" />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-indigo-700">Contribute as {selectedRole}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">{renderFormFields()}
              {filePreview && (
                <div className="mt-2">
                  {filePreview.startsWith("data:video") ? (
                    <video controls className="w-full max-h-64 rounded">
                      <source src={filePreview} />
                    </video>
                  ) : (
                    <img src={filePreview} alt="Preview" className="w-full max-h-64 object-cover rounded" />
                  )}
                </div>
              )}
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded shadow-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
