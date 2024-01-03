// all of the login logic here
import express from "express"
import { checkLoginCredit } from "../services/loginService"

const router = express.Router()

router.get("/info", (_req, res) => {
  res.send("This is the login router")
})

router.put("/", (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username) {
    res.status(400).send("Missing username")
    return
  }

  if (!password) {
    res.status(400).send("Missing password")
    return
  }

  if (!checkLoginCredit(username, password)) {
    res.status(400).send("Incorrect username or password")
    return
  }

  res.sendStatus(200)
})

export default router
