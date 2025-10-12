import express from "express";
import { getMonasteries, approveMonastery } from "../controllers/monasteryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all monasteries
router.get("/", getMonasteries);

// Approve a monastery (admin only)
router.put("/:id/approve", verifyToken, approveMonastery);

export default router;
