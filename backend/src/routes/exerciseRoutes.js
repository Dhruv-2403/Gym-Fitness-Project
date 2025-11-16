import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  createExerciseSchema,
  listExercisesQuerySchema
} from "../validation/exerciseSchemas.js";

import {
  createExercise,
  listExercises
} from "../controllers/exerciseController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createExerciseSchema), createExercise);

router.get("/", validate(listExercisesQuerySchema, "query"), listExercises);

export default router;
