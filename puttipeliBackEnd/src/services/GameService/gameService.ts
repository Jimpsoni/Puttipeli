// @ts-nocheck

import mongoose from "mongoose"
import { GameRequest } from "../../types"
import { User } from "../UserService/userSchema"

mongoose.set("strictQuery", false)

export const saveGameToUser = async (props: GameRequest) => {
  try {
    await mongoose.connect(process.env.DB_URI as string)
    await mongoose.connection.syncIndexes()

    const query = await User.findOne({ _id: props.userid })
    if (!query) throw new Error("No user with that ID")
    console.log(props.game)
    query.games = query.games.concat(props.game)
    await query.save()

    return
  } finally {
    await mongoose.connection.close()
  }
}
