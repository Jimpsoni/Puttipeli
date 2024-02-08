// all of the login logic here
import express from "express"
import {
  checkLoginCredit,
  getAllUsers,
} from "../services/UserService/userService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the login router")
  getAllUsers()
})

router.post("/", (req, res) => {
  const username = req.body.username as string
  const password = req.body.password as string

  if (!username) {
    res.status(401).json("Missing username")
    return
  }

  if (!password) {
    res.status(401).json("Missing password")
    return
  }

  if (!checkLoginCredit(username, password)) {
    res.status(401).json("Incorrect username or password")
    return
  }

  res.sendStatus(200)
})

export default router
