import axios from "axios"
import { GameResult } from "../types"

const baseUrl = 'http://localhost:3000/api/game'

export const postGameResult = (object: GameResult[]) => {
  return axios
    .post<GameResult[]>(baseUrl, object)
    .then(res => res.data)
}