import express from "express"
import {
  getAllUsers,
  getUserByID,
  deleteUserByID,
} from "../services/UserService/userService"

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
  // TODO check if object sent is an ID

  getUserByID(id)
    .then((user) => {
      // Don't send password hash to user
      // @ts-expect-error: This line can't throw error
      delete user["password"]
      res.status(200).json(user)
    })
    .catch((error: Error) => {
      if (error.message == "No user with that ID") {
        res.status(404).send()
        return
      }
      res.status(500).send("Internal Server Error")
    })
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  // TODO check if object sent is an ID
  deleteUserByID(id)
    .then(() => {
      res.status(204).send()
    })
    .catch((error: Error) => {
      if (error.message == "No user with that ID") {
        res.status(404).send(error.message)
        return
      }
      res.status(500).send("Internal Server Error")
    })
})

export default router
