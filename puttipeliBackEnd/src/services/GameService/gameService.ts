import mongoose from "mongoose"
import { GameRequest, GameType } from "../../types"
import { User } from "../UserService/userSchema"
import { Game } from "../GameService/gameSchema"

mongoose.set("strictQuery", true)

export const saveGameToUser = async (props: GameRequest) => {
  try {
    await mongoose.connect(process.env.DB_URI as string)
    await mongoose.connection.syncIndexes()

    const userQuery = await User.findOne({ _id: props.userid })
    if (!userQuery) throw new Error("No user with that ID")

    const new_game = new Game({ ...props })
    const saved_game = await new_game.save().then((u) => u as GameType)


    // eslint-disable-next-line 
    userQuery.games = userQuery.games.concat(saved_game.id)

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

    const userQuery = await User.findOne({ _id: userid }).populate("games")
    if (!userQuery) throw new Error("No user with that ID")

    return userQuery.games
  } finally {
    await mongoose.connection.close()
  }
}
