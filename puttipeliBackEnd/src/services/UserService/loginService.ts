import { User } from "./userSchema"
import mongoose from "mongoose"
import { UserType } from "../../types"

export const checkLoginCredit = async (
  username: string,
  password: string
): Promise<boolean> => {
  await mongoose.connect(process.env.DB_URI as string)
  return User.findOne({ username: `${username}` })
    .then( async (user: UserType | undefined) => {
      if (!user) {
        await mongoose.connection.close()
        return false
      }

      if (user.password === password) {
        await mongoose.connection.close()
        return true
      }

      await mongoose.connection.close()
      return false
    })
    .catch(async () => {
      await mongoose.connection.close()
      return false
    })
}
