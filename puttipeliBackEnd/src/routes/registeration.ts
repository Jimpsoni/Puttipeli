import express from "express"
import { AddNewUser } from "../services/UserService/userService"
import { NewUserType } from "../types"
import { checkIfObjectIsUser } from "../services/helperFunctions"

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

router.post("/", (req, res) => {
  // TODO don't send password hash to user
  try {
    const data = ValidateRequest(req.body)

    AddNewUser({ ...data })
    .then((response) => {
      if (checkIfObjectIsUser(response)) res.status(201).json({"user": response})
      else res.status(400).json({errors: response})
    })
    .catch(() => {
      res.status(500).json({ errors: 'Internal Server Error' })
    })
    return
  } catch (e) {
    if (e instanceof Error && "message" in e) res.status(400).json({error: e.message}).send()
    else res.status(500).json({error: 'Something happened while parsing request'}).send()
    return
  }
})

export default router
