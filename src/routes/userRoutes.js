import express from "express"
import {signup,profile} from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router=express.Router()
router.post("/signup",signup)
router.get("/profile",authMiddleware,profile)


export default router
