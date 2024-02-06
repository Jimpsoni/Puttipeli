import express from "express"
import loginRouter from "./routes/login"
import userRouter from "./routes/user"
import cors from "cors"
import path from "path"

const app = express()
app.use(express.json())

// Serve all the static files
app.use(express.static(path.join(__dirname, "../../puttipeliFrontEnd/dist")))

app.use(cors())

// All of the routes
app.use("/api/login", loginRouter)
app.use("/api/user", userRouter)

// testing
app.get("/ping", (_req, res) => {
  res.send("pong")
})

// HealthCheck
app.get("/health", (_req, res) => {
  res.send("A OK!")
})

export default app
