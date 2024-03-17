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

// For now, games only have scores and gamemodes
export interface Game {
  gamemode: string
  score: number
}

// Incoming data from frontend
export interface GameRequest {
  userid: string,
  game: Game
}