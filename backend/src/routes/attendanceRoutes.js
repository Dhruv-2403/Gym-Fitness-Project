import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkIn, checkOut, getTodayStatus, getHistory } from "../controllers/attendanceController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/check-in", checkIn);
router.post("/check-out", checkOut);
router.get("/today", getTodayStatus);
router.get("/history", getHistory);

export default router;
