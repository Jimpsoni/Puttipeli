// all of the login logic here
import express from "express"
import { checkLoginCredit } from "../services/UserService/userService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the login router")
})

router.post("/", (req, res) => {
  console.log("New login request")

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const username = req.body.username
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const password = req.body.password


  if (!username) {
    res.status(401).json("Missing username")
    return
  }

  if (!password) {
    res.status(401).json("Missing password")
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!checkLoginCredit(username, password)) {
    res.status(401).json("Incorrect username or password")
    return
  }

  res.sendStatus(200)
})

export default router
