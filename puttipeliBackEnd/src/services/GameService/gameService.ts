// @ts-nocheck

import mongoose from "mongoose"
import { GameRequest } from "../../types"
import { User } from "../UserService/userSchema"

mongoose.set("strictQuery", true)

export const saveGameToUser = async (props: GameRequest) => {
  try {
    await mongoose.connect(process.env.DB_URI as string)
    await mongoose.connection.syncIndexes()

    const userQuery = await User.findOne({ _id: props.userid })
    if (!userQuery) throw new Error("No user with that ID")

    /*
    TODO
      Save new game to db and get its ID
      then save that id to users games
    */

    const newGameID = "New Game ID"

    userQuery.games = userQuery.games.concat(newGameID)
    await userQuery.save()

    return
  } finally {
    await mongoose.connection.close()
  }
}

export const getUsersGames = async (userid: string) => {
  try {
    await mongoose.connect(process.env.DB_URI as string)
    await mongoose.connection.syncIndexes()

    const userQuery = await User.findOne({ _id: userid })
    if (!userQuery) throw new Error("No user with that ID")
    return userQuery.games
  } finally {
    await mongoose.connection.close()
  }
}
