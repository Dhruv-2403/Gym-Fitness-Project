import prisma from "../prisma/client.js";

export async function checkIn(req, res) {
  try {
    const userId = req.user?.user_id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const openSession = await prisma.attendance.findFirst({
      where: { userId, checkOut: null },
    });

    if (openSession) {
      return res.status(400).json({ error: "You already have an active check-in" });
    }

    const now = new Date();

    const attendance = await prisma.attendance.create({
      data: {
        userId,
        checkIn: now,
      },
    });

    return res.status(201).json({ message: "Checked in", attendance });
  } catch (err) {
    console.error("Attendance check-in error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function checkOut(req, res) {
  try {
    const userId = req.user?.user_id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const openSession = await prisma.attendance.findFirst({
      where: { userId, checkOut: null },
    });

    if (!openSession) {
      return res.status(400).json({ error: "No active check-in to check out from" });
    }

    const now = new Date();
    const durationMinutes = Math.max(1, Math.round((now - openSession.checkIn) / 60000));

    const updated = await prisma.attendance.update({
      where: { id: openSession.id },
      data: { checkOut: now, durationMinutes },
    });

    return res.json({ message: "Checked out", attendance: updated });
  } catch (err) {
    console.error("Attendance check-out error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getTodayStatus(req, res) {
  try {
    const userId = req.user?.user_id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todayRecords = await prisma.attendance.findMany({
      where: { userId, checkIn: { gte: start, lte: end } },
      orderBy: { checkIn: "desc" },
    });

    const openSession = todayRecords.find(r => r.checkOut === null) || null;

    return res.json({
      open: Boolean(openSession),
      openSession,
      todayRecords,
    });
  } catch (err) {
    console.error("Attendance today status error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getHistory(req, res) {
  try {
    const userId = req.user?.user_id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { from, to, limit } = req.query;

    const where = { userId };
    if (from || to) {
      where.checkIn = {};
      if (from) where.checkIn.gte = new Date(from);
      if (to) where.checkIn.lte = new Date(to);
    }

    const take = Math.min(Math.max(parseInt(limit || "30", 10), 1), 200);

    const records = await prisma.attendance.findMany({
      where,
      orderBy: { checkIn: "desc" },
      take,
    });

    return res.json({ records });
  } catch (err) {
    console.error("Attendance history error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
