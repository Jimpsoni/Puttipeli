// import { User } from './userSchema'
import { UserType } from "../../types"

// Mock data
const users = [
  {
    id: "1",
    username: "Jimi",
    passwordHash: "salasana",
    dob: new Date("2001-04-17"),
    registered: new Date("2024-01-01"),
    games: [],
  },
]

export const getByID = (id: string): null | UserType => {
  // TODO fetch from database
  const user = users.find((o) => o.id === id)

  if (user) {
    return user
  }

  return null
}

export const checkLoginCredit = (
  username: string,
  passwordHash: string
): boolean => {
  console.log(`Logging in: ${username}, ${passwordHash}`)
  if (username == "admin" && passwordHash == "salasana") return true
  return false
}
