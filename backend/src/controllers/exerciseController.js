import prisma from "../prisma/client.js";

export async function createExercise(req, res) {
  try {
    const userId = req.user?.user_id;
    const { name, muscleGroup } = req.body;

    const exercise = await prisma.exercise.create({
      data: { name:name.toLowerCase(), muscleGroup:muscleGroup.toLowerCase(), userId: userId|| null},
    });
    res.status(201).json({ exercise });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Exercise with this name already exists" });
    }
    console.error("createExercise error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function listExercises(req, res) {
  try {
    const userId = req.user?.user_id;
    const q = req.query.q?.toLowerCase();

    const exercises = await prisma.exercise.findMany({
      where: {
        OR: [
          { userId ,
          ...(q ? { name: { contains: q} } : {})
          },
          { userId: null ,
          ...(q ? { name: { contains: q} } : {})
          },
        ],
    
      },
      orderBy: { name: "asc" },
    });

    res.json({ exercises });
  } catch (err) {
    console.error("listExercises error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
