// server.js
import dotenv from "dotenv";
dotenv.config(); // must be first

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import monasteryRoutes from "./routes/monasteryRoutes.js";
import contributionRoutes from "./routes/contributionRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api/monasteries", monasteryRoutes);
app.use("/api/contributions", contributionRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
