import axios from "axios"
import { GameResult, Game } from "../types"

const baseUrl = 'http://localhost:3000/api'

export interface Props {
  userid: string
  points: number
  rounds: GameResult[]
  date: Date
}

interface Request {
  Games: Game[]
}

export const postGameResult = async (data: Props) => {
  return await axios.post<GameResult[]>(baseUrl + '/game/submit', data)
    .then(res => res)
    .catch(res => console.log(res))
}

export const getUserGames = async (userid: string): Promise<Game[]> => {
  const url = baseUrl + '/game/user/' + userid
  console.log(url)

  const games = await axios.get<Request>(url)
    .then(res => res.data.Games)
    .catch(() => null)
  if (!games) return []
  return games

}