
import prisma from "../../prisma/client.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const SALT_ROUNDS = 12
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'dev-fitfusion-secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

// console.log(JWT_SECRET_KEY)
async function signup(req, res) {
  return res.status(403).json({ error: "Email/password signup is disabled. Please use Google Sign-In." });
}

async function login(req, res) {
  return res.status(403).json({ error: "Email/password login is disabled. Please use Google Sign-In." });
}


async function profile(req, res) {

  try {
    const userID = req.user?.user_id;

    if (!userID) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: {
        user_id: userID,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("Profile error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { signup, login, profile }


