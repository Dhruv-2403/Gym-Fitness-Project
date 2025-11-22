import express from "express"
import {signup,profile,login} from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"



const router = express.Router()
router.post("/signup", signup)
router.post("/login", login)
router.get("/profile",authMiddleware,profile)

export default router
