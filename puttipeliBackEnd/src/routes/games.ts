import express from "express"
import { saveGameToUser } from "../services/GameService/gameService"
import { GameRequest } from "../types"

const router = express.Router()

function ValidateRequest(props: unknown): GameRequest {
  // props must be object
  if (typeof props !== "object" || !props)
    throw new TypeError("Props is not an Object")
  if (!("userid" in props)) {
    throw new TypeError("Could not find 'userid' in request")
  }
  if (!("game" in props)) {
    throw new TypeError("Could not find 'game' in request")
  }
  // @ts-expect-error: Place holder
  return props
}

router.get("/", (_req, res) => {
  res.send("This is the Game router")
})

router.post("/submit", (req, res) => {
  try {
    const data = ValidateRequest(req.body)
    saveGameToUser(data)
      .then(() => res.status(201).send("Saved game to user"))
      .catch(() => res.status(500).send("Internal Server Error"))
  } catch (e: unknown) {
    // @ts-expect-error: We only throw errors that have message
    res.status(400).send(e.message)
  }
})

export default router
