import express from "express";
import userRoutes from  "./routes/userRoutes.js"
import dotenv from "dotenv"
dotenv.config()
console.log(process.env.JWT_SECRET_KEY)
const app = express()




const PORT=3000



app.use(express.json())
app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})