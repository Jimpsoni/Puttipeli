import express from "express"
import cors from "cors"
import path from "path"

// Routes
import loginRouter from "./routes/login"
import userRouter from "./routes/users"
import registerRoute from "./routes/registeration"
import gameRoute from "./routes/games"
import { log } from "./services/logger"

// To use env variables
import dotenv from 'dotenv'
dotenv.config();

const app = express()
app.use(express.json())



if (process.env.DBENV == 'prod') {
  log("Using production environment")
  process.env.DBURI = process.env.DB_URI_PROD
} else {
  log("Using test environment")
  process.env.DBURI = process.env.DB_URI_TEST
}


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
