import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

/*
Username: atleast 3 chars, unique, required
password: atleast 6 chars, required
*/

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },

  passwordHash: {
    type: String,
    minlength: 6,
    required: true,
  },

  dob: Date,
  registered: Date,
  games: [],
})

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.passwordHash
  },
})

userSchema.plugin(uniqueValidator)
export const User = mongoose.model("User", userSchema)
