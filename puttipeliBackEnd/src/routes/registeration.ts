import express from "express"
import { AddNewUser } from "../services/UserService/userService"
import { NewUserType } from "../types"

const router = express.Router()

function ValidateRequest(props: unknown): NewUserType {
  // props must be object
  if (typeof props !== "object" || !props)
    throw new TypeError("Props is not an Object")

  // Object must have attributes username, password and email
  if (!("username" in props)) {
    throw new TypeError("Could not find Username in request")
  }
  if (!("password" in props)) {
    throw new TypeError("Could not find Password in request")
  }
  if (!("email" in props)) {
    throw new TypeError("Could not find Email in request")
  }

  // All of the attributes must be strings
  if (typeof props.username !== "string")
    throw new TypeError("Username is not string")
  if (typeof props.password !== "string")
    throw new TypeError("Password is not string")
  if (typeof props.email !== "string")
    throw new TypeError("Email is not string")

  return {
    username: props.username,
    password: props.password,
    email: props.email,
  }
}

// CREATE NEW USER
router.post("/", (req, res) => {
  let data
  try {
    data = ValidateRequest(req.body)
  } catch (e) {
    if (e instanceof Error && "message" in e) res.status(400).send(e.message)
    else res.status(400).send()
    return
  }

  AddNewUser({ ...data })
    .then((response) => {
      if (response.status === "ok") res.status(201).send()
      if (response.status === "error") {
        res.status(400).json({ errors: response.errors })
      }
    })
    .catch(() => {
      res.status(500).json({ errors: 'Internal Server Error' })
    })
})

export default router
