import express from "express";
import { getMonasteries } from "../controllers/monasteryController.js";

const router = express.Router();

// Example routes
router.get("/", getMonasteries);

// Add more routes here as needed
// router.get("/:id", getMonasteryById);

export default router;
