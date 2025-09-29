import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import monasteryRoutes from "./routes/monasteryRoutes.js";
import contributionRoutes from "./routes/contributionRoutes.js";
import homestayRoutes from "./routes/homestayRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Important: parse JSON request bodies

// Routes
app.use("/auth", authRoutes);
app.use("/api/monasteries", monasteryRoutes);
app.use("/api/contributions", contributionRoutes);

app.use("/api/homestays", homestayRoutes);
// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
