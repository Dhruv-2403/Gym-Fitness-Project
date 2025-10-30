import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
console.log(JWT_SECRET_KEY)

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }
    // payload object
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    // console.log(payload)





    if (!payload || !payload.user_id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = {
      user_id: payload.user_id,
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ error: "Unauthorized: invalid or expired token" });
  }
}
