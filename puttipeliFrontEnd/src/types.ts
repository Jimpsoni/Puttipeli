import { Dispatch, SetStateAction } from "react"

export interface UserType {
  id: string
  username: string
  email: string
  registered: Date
  games: Game[]
}

export interface Game {
  gamemode: string
  score: number
}

export interface GameResult {
  distance: number,
  shotsInBasket: number
}

export interface UserContextType {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null> | null>;
}