// @ts-nocheck
import { User } from "./userSchema"
import { NewUserType, UserType } from "../../types"
import mongoose from "mongoose"

mongoose.set("strictQuery", false)
type Result<T> = { status: "ok" } | { status: "error"; errors: T[] }

export const AddNewUser = async (
  NewUserProps: NewUserType
): Promise<Result<string>> => {
  await mongoose.connect(process.env.DB_URI as string)
  await mongoose.connection.syncIndexes()

  const new_user = new User({ ...NewUserProps })

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await new_user.save()
    await mongoose.connection.close()
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
    if (e.errors.password) {
      if (e.errors.password.kind === "required")
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

    await mongoose.connection.close()
    return { status: "error", errors }
  }
}

export const getAllUsers = async (): Promise<UserType[]> => {
  await mongoose.connect(process.env.DB_URI as string)
  let users = [] as UserType[]

  try {
    users = await User.find({})
  } 
  catch (e) {
    console.log("Something wrong with mongo")
    console.log(e)
  } 
  finally {
    await mongoose.connection.close()
  }
  
  return users
}
