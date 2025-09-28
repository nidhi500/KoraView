// controllers/monasteryController.js

import Monastery from "../models/Monastery.js";

// Named export
export const getMonasteries = async (req, res) => {
  try {
    const monasteries = await Monastery.find();
    res.json(monasteries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// You can add more named exports for other monastery endpoints
// export const getMonasteryById = async (req, res) => { ... }
