import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z.string().min(1).max(100),
  muscleGroup: z.string().min(1).max(100).optional(),
});

export const listExercisesQuerySchema = z.object({
  q: z.string().min(1).optional(),
});
