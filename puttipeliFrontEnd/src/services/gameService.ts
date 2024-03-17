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


export const postGameResult = async (object: GameResult[]) => {
  const data = {
    userid: "Placeholder value",
    game: object
  }
  
  await axios.post<GameResult[]>(baseUrl, data)
    .then(res => console.log(res))
    .catch(res => console.log(res))
}