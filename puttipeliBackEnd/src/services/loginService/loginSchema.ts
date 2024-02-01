import mongoose from "mongoose"

const loginSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
})

loginSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString()
    
  },
})

export const Login = mongoose.model("Login", loginSchema)
