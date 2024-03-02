import bcrypt from "bcrypt"
import { UserType } from "../types"

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
  if (!(typeof o === 'object') || !o) return null
  
  if ('id' in o && typeof o.id == 'string' &&
      'username' in o && typeof o.username == 'string' &&
      'password' in o && typeof o.password == 'string' &&
      'email' in o && typeof o.email == 'string' &&
      'registered' in o && o.registered instanceof Date && 
      'games' in o
  ) {
    return {
      id: o.id,
      username: o.username,
      password: o.password,
      email: o.email,
      registered: o.registered,
      games: o.games as Game[]
    }
  } else { 
    return null
  }
}
