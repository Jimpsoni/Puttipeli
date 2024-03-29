import express from "express"
import { checkLoginCredit } from "../services/UserService/userService"
import {  UserType } from "../types"

const router = express.Router()

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
    .then((user: UserType) => {
      // Don't send password hash to user
      // @ts-expect-error: This line can't throw error
      delete user['password']

      res.status(200).json({ user: user })
      return
    })
    .catch((error: Error) => {
      // If not expected error, send server error
      if (error.message == "Username or password incorrect") res.status(401)
      else {
        res.status(500).json({ error: "Internal Server Error" })
        return
      }

      res.json({ error: error.message })
      return
    })
})

export default router
