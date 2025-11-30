
import prisma from "../prisma/client.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const SALT_ROUNDS = 12
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'dev-fitfusion-secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

// console.log(JWT_SECRET_KEY)
async function signup(req, res) {
  try {
    const { user_name, user_email, user_password } = req.body;

    if (!user_name || !user_email || !user_password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    if (
      typeof user_name !== "string" ||
      typeof user_email !== "string" ||
      typeof user_password !== "string" ||
      user_name.trim() === ""
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        user_email: user_email.toLowerCase(),
      },
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(user_password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        user_name,
        user_email: user_email.toLowerCase(),
        user_password: hashPassword,
      },
    });

    const token = jwt.sign({ user_id: newUser.user_id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser, token })
  } catch (err) {
    console.error("Signup error", err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}




export async function login(req, res) {

  try {
    const { user_name, user_email, user_password } = req.body

    if ((!user_email && !user_name) || !user_password) {
      return res.status(400).json({ error: "Username or email plus password are required" })
    }

    const identifier = user_email?.toLowerCase()

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          identifier ? { user_email: identifier } : undefined,
          user_name ? { user_name } : undefined,
        ].filter(Boolean),
      },
    })

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isValidPassword = await bcrypt.compare(user_password, user.user_password)
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    })

    res.json({ message: "Login successful", user: { user_id: user.user_id, user_name: user.user_name, user_email: user.user_email }, token })
  } catch (err) {
    console.error("Login error", err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}


export async function profile(req, res) {

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
