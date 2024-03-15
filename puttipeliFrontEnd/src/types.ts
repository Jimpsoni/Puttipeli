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