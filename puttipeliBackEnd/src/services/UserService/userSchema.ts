import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

/*
Username: atleast 3 chars, unique, required
email: Validated by validateEmail function
*/

const validateEmail = function(email: string): boolean {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },

  passwordHash: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },

  registered: {
    type: Date,
    default: Date.now
  },
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
