import { z } from "zod";

export const createWorkoutSchema = z.object({
  date: z.string().datetime().optional(),
  title: z.string().max(100).optional(),
  notes: z.string().max(1000).optional(),
});

export const addSetSchema = z.object({
  exerciseId: z.number().int().positive(),
  reps: z.number().int().min(1).max(1000),
  weight: z.number().min(0).max(2000).optional(),
  rpe: z.number().min(0).max(10).optional(),
  order: z.number().int().min(1).optional(),
});
