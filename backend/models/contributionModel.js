import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  submittedBy: { type: String, required: true },
  type: { type: String, enum: ["monk", "local", "researcher"], required: true },
  content: { type: String },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

const Contribution = mongoose.model("Contribution", contributionSchema);
export default Contribution;
