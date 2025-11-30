import express from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    getCategories
} from "../controllers/productController.js";
import { createCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.get("/:id", getProduct);

export default router;

