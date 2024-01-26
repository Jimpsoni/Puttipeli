// all of the login logic here
import express from "express"
import { checkLoginCredit } from "../services/loginService/loginService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the login router")
})

router.post("/", (req, res) => {
  console.log("New login request")
  const username = req.body.username
  const password = req.body.password

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
