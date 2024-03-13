import express from "express"
import { checkLoginCredit } from "../services/UserService/userService"
import { UserType } from "../types"

/*

REMOVE ALL THE DEBUGGING CONSOLE LOGS

*/

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the login router")
})

router.post("/", (req, res) => {
  // TODO don't send password hash to user
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
      res.status(200).json({ user: user })
      return
    })
    .catch((error: Error) => {
      // If not expected error, send server error
      if (error.message == "Username or password incorrect") res.status(401)
      else { res.status(500).json({ error: "Internal Server Error" }); return }

      res.json({ error: error.message })
      return
    })
})

export default router
