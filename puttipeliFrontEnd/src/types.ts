import { Dispatch, SetStateAction } from "react"

export interface UserType {
  id: string
  username: string
  email: string
  registered: Date
  games: Game[]
}

export interface Game {
  date: Date
  points: number
  rounds: GameResult[]
  userid: string
}

export interface GameResult {
  distance: number,
  shotsInBasket: number
}

export interface UserContextType {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null> | null>;
}