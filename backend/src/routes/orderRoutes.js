import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/:id/status", updateOrderStatus);

export default router;

