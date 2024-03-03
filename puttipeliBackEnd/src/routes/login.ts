import express from "express"
import { checkLoginCredit } from "../services/UserService/userService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the login router")
})

router.post("/", (req, res) => {
  // TODO don't send password hash to user
  const username = req.body.username as string
  const password = req.body.password as string

  if (!username) {
    res.status(200).json({ status: 200, error: "Missing username" })
    return
  }

  if (!password) {
    res.status(401).json({ status: "error", error: "Missing password" })
    return
  }

  checkLoginCredit(username, password)
    .then((response) => {
      if (response.status === "ok") {
        res.status(200).send({ status: "ok", user: response.user })
      } else if (response.status === "error") {
        if (response.error === "Internal Server Error")
          res.status(500).json({ status: "error", error: response.error })
        if (response.error === "No user with that username")
          res.status(401).json({
            status: "error",
            error: "Could not find user with that username",
          })
        if (response.error === "Password didn't match")
          res
            .status(401)
            .json({ status: "error", error: "Incorrect username or password" })
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ status: "error", error: "Something wrong with server" })
    )
})

export default router
