
import { User } from "./userSchema"
import { NewUserType, UserType } from "../../types"
import { HashPassword, checkIfObjectIsUser, checkPassword } from "../helperFunctions"
import mongoose from "mongoose"

interface ResponseCode {
  status: string
  error?: string
}

mongoose.set("strictQuery", false)
type Result<T> =
  | { status: "ok"; user: UserType }
  | { status: "error"; errors: T[] }

export const AddNewUser = async (
  NewUserProps: NewUserType
): Promise<Result<string>> => {
  try {
    await mongoose.connect(process.env.DB_URI as string)
    await mongoose.connection.syncIndexes()
    NewUserProps.password = await HashPassword(NewUserProps.password)
    const new_user = new User({ ...NewUserProps })

    // eslint-disable-next-line
    // @ts-ignore
    // eslint-disable-next-line
    const user = await new_user.save().then((user) => user.toJSON())
    await mongoose.connection.close()
    const isUser = checkIfObjectIsUser(user)
    if (isUser) {
      return { status: "ok", user: isUser}
    } else {
      return { status: 'error', errors: ["Mongoose didn't return usertype"]}
    }
  } catch (e) {
    const errors = [] as string[]
    if (typeof e !== "object" || !e)
      return { status: "error", errors: ["Internal Server Error"] }
    if (!("errors" in e) || typeof e.errors !== "object" || !e.errors)
      return { status: "error", errors: ["Internal Server Error"] }

    // Check the username
    if (
      "username" in e.errors &&
      typeof e.errors.username === "object" &&
      e.errors.username &&
      "kind" in e.errors.username
    ) {
      if (e.errors.username.kind === "minlength") {
        errors.push("Username not long enough")
      } else if (e.errors.username.kind === "unique") {
        errors.push("Username already in use")
      } else if (e.errors.username.kind === "required")
        errors.push("Username is required")
    }

    // Check password
    if (
      "password" in e.errors &&
      typeof e.errors.password === "object" &&
      e.errors.password &&
      "kind" in e.errors.password
    ) {
      if (e.errors.password.kind === "required")
        errors.push("Password is required")
    }

    // Check email
    if (
      "email" in e.errors &&
      typeof e.errors.email === "object" &&
      e.errors.email &&
      "kind" in e.errors.email
    ) {
      if (e.errors.email.kind === "required") errors.push("Email is required")
      else if (
        "properties" in e.errors.email &&
        typeof e.errors.email.properties === "object" &&
        e.errors.email.properties &&
        "message" in e.errors.email.properties
      )
        if (e.errors.email.properties.message === "Invalid Email address")
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
  } catch (e) {
    console.log("Something wrong with mongo")
    console.log(e)
  } finally {
    await mongoose.connection.close()
  }

  return users
}

export const checkLoginCredit = async (
  username: string,
  password: string
): Promise<ResponseCode> => {
  await mongoose.connect(process.env.DB_URI as string)

  // Find user
  return User.findOne({ username: `${username}` })
    .then(async (user: unknown) => {
      if (!user) {
        await mongoose.connection.close()
        return { status: "error", error: "No user with that username" }
      }

      // Check password
      if (
        typeof user === "object" &&
        "password" in user &&
        typeof user.password == "string"
      ) {
        if (await checkPassword(user.password, password)) {
          await mongoose.connection.close()
          return { status: "ok" }
        }
      }

      // If password fails
      await mongoose.connection.close()
      return { status: "error", error: "Password didn't match" }
    })
    .catch(async () => {
      await mongoose.connection.close()
      return { status: "error", error: "Internal Server Error" }
    })
}

export const getUserByID = async (id: string): Promise<UserType | null> => {
  try {
    await mongoose.connect(process.env.DB_URI as string)
    return await User.findOne({_id: id})
  } catch (e) {
    return null
  } finally {
    await mongoose.connection.close()
  }
}
