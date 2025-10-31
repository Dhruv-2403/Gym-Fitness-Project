
import prisma from "../prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const SALT_ROUNDS = 12;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

// console.log(JWT_SECRET_KEY)
export async function signup(req, res) {
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

    res.status(201).json({ message: "User registered successfully", user: newUser, token });
  } catch (err) {
    console.error("Signup error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function login(req, res) {
  try {
    const { user_name, user_email, user_password } = req.body
    if (!user_name && !user_email || !user_password) {
        return res.status(400).json({
            "error": "All fields are required"
        })
    }
    try {
        const find = await prisma.user.findFirst({
            where: {
                OR: [
                    { user_name: user_name },
                    { user_email: user_email }
                ]
            },

        })
        if (!find) {
            
          return res.status(401).json({ message: "Invalid credentials" });
        }

        if (find.user_password !== user_password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.status(200).json({
            "message": "Login successful!",
            "userData": {
                "username": find.user_name,
                "email": find.user_email
            }
        })

    }
    catch {
        return res.status(401).json({
            "message": "Invalid credentials"
        })
    }
} catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ error: "Internal Server Error" });;




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