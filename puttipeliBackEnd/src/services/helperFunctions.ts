import bcrypt from "bcrypt"
import { UserType, Game } from "../types"

export async function HashPassword(pass: string): Promise<string> {
  if (pass.length < 6) return ""
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(pass, saltRounds)
  return Promise.resolve(passwordHash)
}

export async function checkPassword(
  password: string,
  compareTo: string
): Promise<boolean> {
  return await bcrypt.compare(compareTo, password)
}

export function checkIfObjectIsUser(o: unknown): UserType | null {
  if (!(typeof o == "object") || !o) return null

  if (!("id" in o && typeof o.id == "string")) return null
  if (!("username" in o && typeof o.username == "string")) return null
  if (!("email" in o && typeof o.email == "string")) return null
  if (!("password" in o && typeof o.password == "string")) return null
  if (!("registered" in o && o.registered instanceof Date)) return null
  if (!("games" in o)) return null

  return {
    id: o.id,
    username: o.username,
    email: o.email,
    password: o.password,
    registered: o.registered,
    games: o.games as Game[],
  }
}
