import express from "express"
import { AddNewUser } from "../services/UserService/userService"

const router = express.Router()

// CREATE NEW USER
router.post("/", (req, res) => {
  const data = req.body
  
  AddNewUser({...data})


  res.status(201).send()
})

export default router
