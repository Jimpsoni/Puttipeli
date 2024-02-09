import { User } from "./userSchema"
import mongoose from "mongoose"

export const checkLoginCredit = async (
  username: string,
  password: string
): Promise<boolean> => {
  await mongoose.connect(process.env.DB_URI as string)

  try {
    const user = await User.findOne({ username: `${username}` })

    if (!user) {
      mongoose.connection.close()
      return false
    }

    // @ts-ignore   User must have passwordHash in DB
    if (user.password === password) {
      mongoose.connection.close()
      return true
    }

    mongoose.connection.close()
    return false
  } catch (e) {
    return false
  }
}
