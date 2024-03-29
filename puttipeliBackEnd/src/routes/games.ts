import express from "express"
import {
  deleteGame,
  getUsersGames,
  saveGameToUser,
} from "../services/GameService/gameService"
import { GameRequest } from "../types"

const router = express.Router()

function ValidateRequest(props: unknown): GameRequest {
  // props must be object
  if (typeof props !== "object" || !props)
    throw new TypeError("Data send is not an Object")
  if (!("userid" in props)) {
    throw new TypeError("Could not find 'userid' in request")
  }
  if (!("date" in props)) {
    throw new TypeError("Could not find 'date' in request")
  }
  if (!("points" in props)) {
    throw new TypeError("Could not find 'points' in request")
  }
  if (!("rounds" in props)) {
    throw new TypeError("Could not find 'rounds' in request")
  }
  if (!Array.isArray(props.rounds) || props.rounds.length != 20)
    throw new TypeError("Game is not array of size 20")

  props.rounds.map((item) => {
    if (!("distance" in item) || !Number.isInteger(item.distance))
      throw new TypeError("Game array has illegal values")
    if (!("shotsInBasket" in item) || !Number.isInteger(item.shotsInBasket))
      throw new TypeError("Game array has illegal values")
  })

  // @ts-expect-error: Placeholder
  return props
}

router.get("/", (_req, res) => {
  res.send("Ping pong, I am the game router")
})

router.post("/submit", (req, res) => {
  try {
    const data = ValidateRequest(req.body)
    saveGameToUser(data)
      .then((response) => res.status(201).json(response))
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

router.get("/user/:id", (req, res) => {
  const id = req.params.id
  getUsersGames(id)
    .then((data) => res.json({ Games: data }))
    .catch((e: Error) => res.status(400).send(e.message))
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  deleteGame(id)
    .then(() => res.sendStatus(204))
    .catch((e: Error) => res.status(400).send(e.message))
})

export default router
