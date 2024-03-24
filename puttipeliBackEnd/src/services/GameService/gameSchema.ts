import mongoose, { Schema } from "mongoose"
import { GameType } from "../../types"

const gameSchema = new mongoose.Schema<GameType>({
  userid: {
    type: Schema.Types.ObjectId
  },
  points: {
    type: Number,
    min: 0,
    max: 1000,
  },
  rounds: [Object],
  date: {
    type: Date,
    default: Date.now,
  },
})

gameSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const Game = mongoose.model<GameType>("Game", gameSchema)
