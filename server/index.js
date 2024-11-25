import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import courseRouter from "./routes/course.route.js"
import connectDB from "./database/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config({})

connectDB();

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

