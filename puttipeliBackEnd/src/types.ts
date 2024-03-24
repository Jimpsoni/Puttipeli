import { Schema } from "mongoose"

export interface UserType {
  id: string
  username: string
  password: string
  email: string
  registered: Date
  games: Schema.Types.ObjectId[]
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
  points: number // Overall score, calculated from rounds
  rounds: Array<{ distance: number; shotsInTheBasket: number }>
  date: Date
}

export interface GameType extends GameRequest {
  id: Schema.Types.ObjectId // Unique to each game
}
