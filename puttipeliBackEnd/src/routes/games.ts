// @ts-nocheck
import express from "express"
import { saveGameToUser } from "../services/GameService/gameService"

const router = express.Router()

function ValidateRequest(props: unknown) {
  // props must be object
  if (typeof props !== "object" || !props)
    throw new TypeError("Props is not an Object")
  if (!("userid" in props)) {
    throw new TypeError("Could not find 'userid' in request")
  }
  if (!("game" in props)) {
    throw new TypeError("Could not find 'game' in request")
  }
}

router.get("/", (_req, res) => {
  res.send("This is the Game router")
})

router.post("/submit", (req, res) => {
  try {
    const data = ValidateRequest(req.body)
    saveGameToUser()
      .then(() => res.status(201).send("Saved game to user"))
      .catch(() => res.status(500).send("Internal Server Error"))
  } catch (e: Error) {
    res.status(400).send(e.message)
  }
})

export default router
