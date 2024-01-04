import mongoose from "mongoose"

const loginSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
})

loginSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordHash
  },
})

export const Login = mongoose.model("Login", loginSchema)
