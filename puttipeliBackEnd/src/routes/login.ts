import express from "express"
import { getAllUsers } from "../services/UserService/userService"
import { checkLoginCredit } from "../services/UserService/loginService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the login router")
  getAllUsers()
})

router.post("/", async (req, res) => {
  const username = req.body.username as string
  const password = req.body.password as string

  if (!username) {
    res.status(401).json({ error: "Missing username" })
    return
  }

  if (!password) {
    res.status(401).json({ error: "Missing password" })
    return
  }


  let isCorrectCreds
  try {
    isCorrectCreds = await checkLoginCredit(username, password)
  } catch {
    res.status(500).json({error: 'Something wrong with server'})
    return
  }

  if (isCorrectCreds) {
    res.sendStatus(200)
  } else {
    res.status(401).json({ error: "Incorrect username or password" })
    return
  }
})

export default router
