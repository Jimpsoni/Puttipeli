// @ts-nocheck
import { User } from "./userSchema"
import { UserType } from "../../types"
import mongoose from "mongoose"

mongoose.set("strictQuery", false)
type Result<T> = { status: "ok" } | { status: "error"; errors: T[] }

export const AddNewUser = async (
  NewUserProps: UserType
): Promise<Result<string>> => {
  await mongoose.connect(process.env.DB_URI as string)
  await mongoose.connection.syncIndexes()

  const new_user = new User({ ...NewUserProps })

  try {
    await new_user.save()
    mongoose.connection.close()
    return { status: "ok" }
  } catch (e) {
    const errors = [] as string[]

    // Check the username
    if (e.errors.username) {
      if (e.errors.username.kind === "minlength") {
        errors.push("Username not long enough")
      } else if (e.errors.username.kind === "unique") {
        errors.push("Username already in use")
      } else if (e.errors.username.kind === "required")
        errors.push("Username is required")
    }

    // Check password
    if (e.errors.passwordHash) {
      if (e.errors.passwordHash.kind === "required")
        errors.push("Password is required")
    }

    // Check email
    if (e.errors.email) {
      if (e.errors.email.kind === "required") errors.push("Email is required")
      else if (e.errors.email.properties.message === "Invalid Email address")
        errors.push("Invalid Email address")
      else if (e.errors.email.kind === "unique")
        errors.push("Email Already in use")
    }

    mongoose.connection.close()
    return { status: "error", errors }
  }
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
