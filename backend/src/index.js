import "dotenv/config";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js"
import exerciseRoutes from "./routes/exerciseRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// console.log(process.env.JWT_SECRET_KEY)
const app = express()

const PORT = 3000



app.use(express.json())
app.use(cors())




app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
})
app.use("/api/users", userRoutes)
app.use("/api/exercises", exerciseRoutes)
app.use("/api/workouts", workoutRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)


app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})