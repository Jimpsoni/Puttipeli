// Database logic
import { User } from "../types"

// Mock data
const users = [
  {
    id: "1",
    name: "Jimi",
    dob: new Date("2001-04-17"),
    registered: new Date("2024-01-01"),
    games: [],
  },
]

export const getByID = (id: string): null | User => {
  // TODO fetch from database
  let user = users.find((o) => o.id === id)

  if (user) {
    return user
  }

  return null
}
