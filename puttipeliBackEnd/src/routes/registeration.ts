import express from "express"
import { AddNewUser } from "../services/UserService/userService"

const router = express.Router()

// CREATE NEW USER
router.post("/", async (req, res) => {
  const data = req.body
  const response = await AddNewUser({ ...data })
  
  if (response.status === "ok") res.status(201).send()
  else if (response.status === "error") res.status(400).json({'errors': response.errors})
})

export default router
