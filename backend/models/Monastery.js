const mongoose = require('mongoose');

const monasterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  lat: Number,
  lng: Number,
  thumbnail: String,
  panorama360: String,
  approved: { type: Boolean, default: false },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  audioGuides: [{ lang: String, url: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Monastery', monasterySchema);
