import express from "express"
import { saveGameToUser } from "../services/GameService/gameService"
import { GameRequest } from "../types"

const router = express.Router()

function ValidateRequest(props: unknown): GameRequest {
  // props must be object
  if (typeof props !== "object" || !props)
    throw new TypeError("Data send is not an Object")
  if (!("userid" in props)) {
    throw new TypeError("Could not find 'userid' in request")
  }
  if (!("game" in props)) {
    throw new TypeError("Could not find 'game' in request")
  }
  if (!Array.isArray(props.game) || props.game.length != 20)
    throw new TypeError("Game is not array of size 20")

  props.game.map((item) => {
    if (!("distance" in item) || !Number.isInteger(item.distance))
      throw new TypeError("Game array has illegal values")
    if (!("shotsInBasket" in item) || !Number.isInteger(item.shotsInBasket))
      throw new TypeError("Game array has illegal values")
  })

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
      .catch((e: Error) => {
        if (e.message == "No user with that ID") {
          res.status(400).send(e.message)
        } else {
          res.status(500).send("Internal Server Error")
        }
      })
  } catch (e: unknown) {
    // @ts-expect-error: We only throw errors that have message
    res.status(400).send(e.message)
  }
})

export default router
