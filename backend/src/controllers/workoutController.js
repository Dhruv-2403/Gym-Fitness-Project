import prisma from "../../prisma/client.js";

export async function createWorkout(req, res) {
  try {
    const userId = req.user?.user_id;
    const { date, title, notes } = req.body;

    const workout = await prisma.workout.create({
      data: {
        userId,
        date: date ? new Date(date) : undefined,
        title: title || null,
        notes: notes || null,
      },
    });

    res.status(201).json({ workout });
  } catch (err) {

    return res.status(500).json({ error: "createWorkout error" });
  }
}

export async function listWorkouts(req, res) {
  try {
    const userId = req.user?.user_id;
    const workouts = await prisma.workout.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      include: { sets: { include: { exercise: true } } },
    });
    res.json({ workouts });
  } catch (err) {

    return res.status(500).json({ error: "listWorkouts error" });
    
  }
}

export async function getWorkout(req, res) {
  try {
    const userId = req.user?.user_id;
    const id = Number(req.params.id);

    const workout = await prisma.workout.findFirst({
      where: { id, userId },
      include: { sets: { include: { exercise: true } } },
    });

    if (!workout) return res.status(404).json({ error: "Workout not found" });

    res.json({ workout });
  } catch (err) {
   
    return res.status(500).json({ error: "getWorkout error" });
  }
}

export async function addSet(req, res) {
  try {
    const userId = req.user?.user_id;
    const workoutId = Number(req.params.id);
    const { exerciseId, reps, weight, rpe, order } = req.body;


    const workout = await prisma.workout.findFirst({ where: { id: workoutId, userId } });
    if (!workout) return res.status(404).json({ error: "Workout not found" });

    const set = await prisma.workoutSet.create({
      data: {
        workoutId,
        exerciseId,
        reps,
        weight: weight ,
        rpe: rpe,
        order: order,
      },
    });
 
    res.status(201).json({ set });
  } catch (err) {
    console.error("addSet error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
