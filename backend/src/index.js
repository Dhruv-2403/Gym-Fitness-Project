import express from "express";
import userRoutes from  "./routes/userRoutes.js"
import dotenv from "dotenv"
import cors from "cors";
dotenv.config()
// console.log(process.env.JWT_SECRET_KEY)
const app = express()




const PORT=3000



app.use(express.json())
app.use(cors())

// lightweight request logger
app.use((req, res, next) => {
    const start = Date.now()
    console.log(`${req.method} ${req.url}`)
    res.on('finish', () => {
        console.log(`${req.method} ${req.url} -> ${res.statusCode} ${Date.now() - start}ms`)
    })
    next()
})

// health route to verify server responsiveness from browser
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
})
app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})