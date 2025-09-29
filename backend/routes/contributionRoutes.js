import express from "express";
import { 
  getContributions, 
  approveContribution, 
  rejectContribution 
} from "../controllers/contributionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all contributions (admin only)
router.get("/", verifyToken, getContributions);

// Approve contribution
router.put("/:id/approve", verifyToken, approveContribution);

// Reject contribution
router.put("/:id/reject", verifyToken, rejectContribution);

export default router;
