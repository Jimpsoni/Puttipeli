import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'
import { UserType } from "../../types";

const validateEmail = function(email: string): boolean {
  // eslint-disable-next-line
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new mongoose.Schema<UserType>({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: [validateEmail, 'Invalid Email address'],
  },

  registered: {
    type: Date,
    default: Date.now
  },

  games: []
})


userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.password
    delete returnedObject.__v
  },
})



userSchema.plugin(uniqueValidator)
export const User = mongoose.model("User", userSchema)
