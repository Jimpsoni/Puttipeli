import express from "express"
import { checkLoginCredit } from "../services/UserService/userService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the login router")
})

router.post("/", (req, res) => {
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

  checkLoginCredit(username, password)
    .then(response => {
      console.log(response)
      if (response.status === 'ok') res.sendStatus(200)
      else if (response.status === 'error') {
        if (response.error === 'Internal Server Error') res.status(500).json({ error: response.error })
        if (response.error === "No user with that username") res.status(401).json({ error: "Could not find user with that username" })
        if (response.error === "Password didn't match") res.status(401).json({ error: "Incorrect username or password" })
      }

    })
    .catch(() => res.status(500).json({ error: "Something wrong with server" }))
})

export default router
