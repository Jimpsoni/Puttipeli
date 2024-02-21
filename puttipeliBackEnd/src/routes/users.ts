// all of the user logic here
import express from "express"
import { getAllUsers, getUserByID } from "../services/UserService/userService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the user router. use /:id to get users")
})

router.get("/all", (_req, res) => {
  getAllUsers()
    .then((users) => res.status(200).json(users))
    .catch(() => res.status(500).send("Internal Server Error"))
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  getUserByID(id)
    .then((user) => {
      if (!user) res.status(404).send()
      else res.status(200).json(user)
    })
    .catch(() => res.status(500).send("Internal Server Error"))
})

export default router
