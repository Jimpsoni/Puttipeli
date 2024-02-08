export interface UserType {
  id: string
  username: string
  passwordHash: string
  email: string
  registered: Date
  games: Game[]
}

export interface NewUserType {
  username: string
  passwordHash: string
  email: string
}

// For now, games only have scores and gamemodes
export interface Game {
  gamemode: string
  score: number
}
