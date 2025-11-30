import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function resetStreak(req, res, next) {
  try {
    const userId = req.user.user_id;
    const user = await prisma.user.findUnique({ where: { user_id: userId } });
    if (!user) return next();

    if (user.lastWorkout) {
      const lastWorkoutDate = new Date(user.lastWorkout.toDateString());
      const todayDate = new Date(new Date().toDateString());
      const diffDays = (todayDate - lastWorkoutDate) / (1000 * 60 * 60 * 24);

      if (diffDays > 1 && user.streak > 0) {
        await prisma.user.update({
          where: { user_id: userId },
          data: { streak: 0 },
        });
      }
    }

    next();
  } catch (err) {
    console.error("Error in streak reset middleware:", err);
    next();
  }
}
