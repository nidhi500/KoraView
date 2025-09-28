// models/Monastery.js
import mongoose from "mongoose";

const monasterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  thumbnail: { type: String },
  description: { type: String },
  archives: [{ type: String }], // array of archive URLs or IDs
});

const Monastery = mongoose.model("Monastery", monasterySchema);

export default Monastery;
