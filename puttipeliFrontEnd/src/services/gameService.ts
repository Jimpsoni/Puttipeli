import axios from "axios"
import { GameResult } from "../types"

const baseUrl = 'http://localhost:3000/api/game/submit'

/*
TODO 
  - send user id with the game object

  api/game/submit expects json object:
  {
    userid: USERID
    game: in what ever shape the game object is in
  }
*/

export interface Props {
  userid: string // Who this belongs to
  points: number // Overall score, calculated from rounds
  rounds: GameResult[]
  date: Date
}


export const postGameResult = async (data: Props) => {
  await axios.post<GameResult[]>(baseUrl, data)
    .then(res => console.log(res))
    .catch(res => console.log(res))
}