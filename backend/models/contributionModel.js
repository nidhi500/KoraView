import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  type: { type: String, enum: ["monks", "locals", "researchers"], required: true },
  title: { type: String, required: true },
  submittedBy: { type: String, required: true },
  content: { type: String },
  files: [{ name: String, url: String }], // can also store as plain string
  audio: [{ lang: String, file: String }],
  video: { type: String },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Contribution", contributionSchema);
