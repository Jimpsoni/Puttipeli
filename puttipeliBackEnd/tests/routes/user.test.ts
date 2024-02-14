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
    console.log("waiting mongo...")
    console.log("With this: " + process.env.DB_URI)
    await mongoose.connect(process.env.DB_URI as string)
    await User.collection.drop()
    await AddNewUser({ ...user })
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
