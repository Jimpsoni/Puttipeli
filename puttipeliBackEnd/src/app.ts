import express from "express"
import cors from "cors"
import path from "path"

// Routes
import loginRouter from "./routes/login"
import userRouter from "./routes/users"
import registerRoute from "./routes/registeration"
import gameRoute from "./routes/games"

// To use env variables
import dotenv from 'dotenv'
dotenv.config();

const app = express()
app.use(express.json())

// Serve all the static files
app.use(express.static(path.join(__dirname, "../../puttipeliFrontEnd/dist")))

app.use(cors())

// All of the routes
app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)
app.use("/api/register", registerRoute)
app.use("/api/game", gameRoute)

// HealthCheck
app.get("/health", (_req, res) => {
  res.send("A OK!")
})

export default app
