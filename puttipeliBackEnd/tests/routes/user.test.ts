import request from "supertest"
import app from "../../src/app"
import mongoose from "mongoose"
import { User } from "../../src/services/UserService/userSchema"
import { AddNewUser } from "../../src/services/UserService/userService"

beforeAll(async () => {
  // Add user to database
  const user = {
    username: "Jimi",
    password: "salainen",
    email: "validemail@gmail.com",
  }
  try {
    await mongoose.connect(process.env.DB_URI as string)
    console.log('We have made connection')
    await User.collection.drop()
    console.log('Dropped user table')
    await AddNewUser({ ...user })
    console.log('Added new user')
  } catch (e) {
    throw Error("Something wrong with MongoDB")
  }
})

describe("Returning users from Database", () => {
  test("Get all users", async () => {
    console.log('We are requesting app')
    const res = await request(app).get("/api/users/all")
    console.log('request returned')
    expect(res.status).toEqual(200)
    expect(res.body[0].username).toEqual("Jimi")
    expect(res.body[0].email).toEqual("validemail@gmail.com")
  }, 10000)
})
