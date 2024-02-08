// all of the user logic here
import express from "express"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send("This is the user router. use /:id to get users")
})

router.get("/:id", (req, _res) => {
  const id = req.params.id
  console.log(id)
})

export default router
