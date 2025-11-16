import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { createWorkoutSchema, addSetSchema } from "../validation/workoutSchemas.js";
import { createWorkout, listWorkouts, getWorkout, addSet } from "../controllers/workoutController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createWorkoutSchema), createWorkout);
router.get("/", listWorkouts);
router.get("/:id", getWorkout);
router.post("/:id/sets", validate(addSetSchema), addSet);

export default router;
