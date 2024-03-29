import mongoose, { Schema } from "mongoose"
import { GameType } from "../../types"

const gameSchema = new mongoose.Schema<GameType>({
  userid: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  points: {
    required: true,
    type: Number,
    min: 0,
    max: 1000,
  },
  rounds: [Object],
  date: {
    required: true,
    type: Date,
    default: Date.now,
  },
})

gameSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line 
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const Game = mongoose.model<GameType>("Game", gameSchema)
