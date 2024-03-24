import { Schema } from "mongoose"

export interface UserType {
  id: string
  username: string
  password: string
  email: string
  registered: Date
  games: GameType[]
}

export interface GameResult {
  distance: number,
  shotsInBasket: number
}

export interface NewUserType {
  username: string
  password: string
  email: string
}

// Incoming data from frontend
export interface GameRequest {
  userid: Schema.Types.ObjectId // Who this belongs to
  points: Number // Overall score, calculated from rounds
  rounds: Array<{ distance: Number; shotsInTheBasket: Number }>
  date: Date
}

export interface GameType extends GameRequest {
  id: string // Unique to each game
}
