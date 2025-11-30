import { body, validationResult } from "express-validator";

export const validateXpStreakLog = [
  body("weight").optional().isFloat({ gt: 0 }),
  body("bodyFatPercentage").optional().isFloat({ min: 0, max: 100 }),
  body("notes").optional().isString().trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
