// import { Login } from './loginSchema'
// Not needed yet


export const checkLoginCredit = (username: string, password: string): boolean => {
  if (username === "admin" && password === "salasana") return true
  return false
}