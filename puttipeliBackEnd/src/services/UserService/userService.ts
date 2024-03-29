import { User } from "./userSchema"
import { NewUserType, UserType } from "../../types"
import { HashPassword, checkPassword } from "../helperFunctions"
import mongoose from "mongoose"

mongoose.set("strictQuery", true)

export const AddNewUser = async (
  NewUserProps: NewUserType
): Promise<UserType | string[]> => {
  try {
    await mongoose.connect(process.env.DBURI as string)
    await mongoose.connection.syncIndexes()

    NewUserProps.password = await HashPassword(NewUserProps.password)
    const new_user = new User({ ...NewUserProps })
    const user = await new_user.save().then((user) => user)

    if (user) return user
    throw new Error("Internal Server Error")
  } catch (e) {
    const errors = [] as string[]
    if (typeof e !== "object" || !e) throw new Error("Internal Server Error")
    if (!("errors" in e) || typeof e.errors !== "object" || !e.errors) {
      throw new Error("Internal Server Error")
    }

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

    return errors
  } finally {
    await mongoose.connection.close()
  }
}

export const getAllUsers = async (): Promise<UserType[]> => {
  try {
    await mongoose.connect(process.env.DBURI as string)
    let users = [] as UserType[]
    users = await User.find({})
    users.map((u) => {
      // This object is only used to send to frontend
      // @ts-expect-error: This line can't throw error
      delete u.password
    })

    return users
  } finally {
    await mongoose.connection.close()
  }
}

export const checkLoginCredit = async (
  username: string,
  password: string
): Promise<UserType> => {
  try {
    await mongoose.connect(process.env.DBURI as string)

    // Try to find user
    const user = await User.findOne({ username: `${username}` }).populate("games")

    // No user found
    if (!user) {
      throw new Error("Username or password incorrect")
    }

    // Password is correct
    if (await checkPassword(user.password, password)) {
      return user
    }

    // Password was incorrect
    throw new Error("Username or password incorrect")
  } finally {
    // Close the connection
    await mongoose.connection.close()
  }
}

export const getUserByID = async (id: string): Promise<UserType> => {
  try {
    await mongoose.connect(process.env.DBURI as string)
    // TODO check if object sent is an ID
    const user = await User.findOne({ _id: id })
    if (!user) throw new Error("No user with that ID")
    return user
  } finally {
    await mongoose.connection.close()
  }
}

export const deleteUserByID = async (id: string) => {
  try {
    await mongoose.connect(process.env.DBURI as string)
    const userInDB = await User.findOne({ _id: id })
    if (!userInDB) throw new Error("No user with that ID")

    await User.deleteOne({ _id: id })
  } finally {
    await mongoose.connection.close()
  }
}
