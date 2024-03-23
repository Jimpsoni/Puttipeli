export interface UserType {
  id: string
  username: string
  password: string
  email: string
  registered: Date
  games: Game[]
}

export interface NewUserType {
  username: string
  password: string
  email: string
}

// Incoming data from frontend
export interface GameRequest {
  userid: string // Who this belongs to
  points: Number // Overall score, calculated from rounds
  rounds: Array<{ distance: Number; shotsInTheBasket: Number }>
  date: Date
}

export interface Game extends GameRequest {
  id: string // Unique to each game
}
