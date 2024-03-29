import mongoose from "mongoose"
import { GameRequest, GameType } from "../../types"
import { User } from "../UserService/userSchema"
import { Game } from "../GameService/gameSchema"

mongoose.set("strictQuery", true)

export const saveGameToUser = async (props: GameRequest): Promise<GameType> => {
  try {
    await mongoose.connect(process.env.DBURI as string)
    await mongoose.connection.syncIndexes()

    const userQuery = await User.findOne({ _id: props.userid })
    if (!userQuery) throw new Error("No user with that ID")

    const new_game = new Game({ ...props })
    const saved_game = await new_game.save().then((u) => u as GameType)

    // eslint-disable-next-line
    userQuery.games = userQuery.games.concat(saved_game.id)

    await userQuery.save()
    return saved_game
  } finally {
    await mongoose.connection.close()
  }
}

export const getUsersGames = async (userid: string) => {
  try {
    await mongoose.connect(process.env.DBURI as string)
    await mongoose.connection.syncIndexes()

    const userQuery = await User.findOne({ _id: userid }).populate("games")
    if (!userQuery) throw new Error("No user with that ID")

    return userQuery.games
  } finally {
    await mongoose.connection.close()
  }
}

export const deleteGame = async (gameid: string) => {
  try {
    await mongoose.connect(process.env.DBURI as string)
    const gameinDB = await Game.findOne({ _id: gameid })
    if (!gameinDB) throw new Error("No Game with that ID")

    await Game.deleteOne({ _id: gameid })

    // Remove the game from user
    const userinDB = await User.findOne({ _id: gameinDB.userid })
    if (!userinDB) throw new Error("No User with that ID")
    userinDB.games = userinDB.games.filter((v) => {
      return String(v) != gameid
    })
  } finally {
    await mongoose.connection.close()
  }
}
