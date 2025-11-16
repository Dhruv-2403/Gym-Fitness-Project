import express from "express"
import {signup,profile,login} from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"



const router=express.Router()
<<<<<<< HEAD
router.post("/signup",signup)
router.post("/login",login)
=======
router.post("/signup", signup)
router.post("/login", login)
>>>>>>> 5119594 (Update UserExercise Management)
router.get("/profile",authMiddleware,profile)


export default router
