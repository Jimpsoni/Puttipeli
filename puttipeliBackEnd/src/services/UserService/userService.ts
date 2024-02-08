import { User } from "./userSchema"
import { UserType } from "../../types"
import mongoose from "mongoose"

mongoose.set("strictQuery", false)

export const AddNewUser = async (NewUserProps: UserType) => {
  mongoose.connect(process.env.DB_URI as string)
  const new_user = new User({
    ...NewUserProps,
  })

  // @ts-ignore
  new_user.save().catch((e: Error) => console.log(e.message))
}

export const getAllUsers = async (): Promise<any[]> => {
  mongoose.connect(process.env.DB_URI as string)

  // @ts-ignore:
  await User.find({}).then((users) => {
    console.log(users)
    mongoose.connection.close()
  })

  return []
}

export const checkLoginCredit = (
  username: string,
  passwordHash: string
): boolean => {
  console.log(username)
  console.log(passwordHash)
  return true
}
