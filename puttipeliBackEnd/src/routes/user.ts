// all of the user logic here
import express from "express"
import { User } from "./types"

const router = express.Router()

// Mock data
const users = [
  {
    name: "Jimi",
    dob: new Date("2001-04-17"),
    registered: "1.1.2024",
    games: [],
  },
]

router.get("/", (_req, res) => {
  res.send("This is the user router")
})

router.get("/:id", (req, res) => {
  const id = req.params.id

  // Send user data
  if (users[Number(id)] != null) {
    res.json(users[Number(id)])
  }

  // No user case
  res.status(404).send("No user with that id")
})

export default router
