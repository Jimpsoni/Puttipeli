export interface User {
    name: string
    dob: Date
    registered: Date
    games: Game[]
}


// For now, games only have scores and gamemodes
export interface Game {
  gamemode: string
  score: number
}