import express from "express";
import { resetStreak } from "../middleware/resetStreakMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import { validateXpStreakLog } from "../validation/StreakValidation";
import { createStreak } from "../controllers/StreakController";

router.use(authMiddleware
    , resetStreak
)
router.post("/progress", validateXpStreakLog, createStreak)
export default router