import express from "express";
import { resetStreak } from "../middleware/resetStreakMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateXpStreakLog } from "../validation/StreakValidation.js";
import { createStreak } from "../controllers/StreakController.js";

const router = express.Router();

router.use(authMiddleware, resetStreak)
router.post("/progress", validateXpStreakLog, createStreak)
export default router