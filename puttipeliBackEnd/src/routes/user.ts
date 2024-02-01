// all of the user logic here
import express from "express"
import { getByID } from "../services/UserService/userService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the user router. use /:id to get users")
})

router.get("/:id", (req, res) => {
  const id = req.params.id

  // Get user from database
  const user = getByID(id)

  if (user) {
    res.json(user)
  }

  // No user case
  res.status(404).send("No user with that id")
})

export default router
