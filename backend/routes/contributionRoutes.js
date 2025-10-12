import express from "express";
import {
  getAllContributions,
  approveContribution,
  rejectContribution
} from "../controllers/contributionController.js";

import { verifyToken } from "../middleware/authMiddleware.js"; // your auth middleware

const router = express.Router();

// Get all contributions (grouped)
router.get("/", verifyToken, getAllContributions);

// Approve a contribution
router.put("/:id/approve", verifyToken, approveContribution);

// Reject a contribution
router.put("/:id/reject", verifyToken, rejectContribution);

export default router;
