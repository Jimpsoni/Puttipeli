import express from "express"
import loginRouter from "./routes/login"
import userRouter from "./routes/user"

const app = express()
app.use(express.json())

// All of the routes
app.use("/api/login", loginRouter)
app.use("/api/user", userRouter)


// testing
app.get("/ping", (_req, res) => {
  console.log("someone pinged here")
  res.send("pong")
})

export default app
