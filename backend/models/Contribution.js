// backend/models/Contribution.js
import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["monk", "local", "researcher"], required: true },
  submittedBy: { type: String, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Contribution", contributionSchema);
