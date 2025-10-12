    // routes/eventRoutes.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const DB_PATH = path.resolve("db.json");

// Helper to read JSON
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

// GET all events
router.get("/", (req, res) => {
  try {
    const db = readDB();
    res.json(db.events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET events by monasteryId
router.get("/monastery/:id", (req, res) => {
  try {
    const db = readDB();
    const monasteryId = parseInt(req.params.id);
    const events = db.events.filter((e) => e.monasteryId === monasteryId);
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST new event
router.post("/", (req, res) => {
  try {
    const { name, date, monasteryId } = req.body;
    if (!name || !date || !monasteryId) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const db = readDB();
    const newEvent = {
      id: "e" + (db.events.length + 1),
      name,
      date,
      monasteryId,
    };
    db.events.push(newEvent);
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
