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
    await User.collection.drop()
    await AddNewUser({ ...user })
  } catch (e) {
    throw Error("Something wrong with MongoDB")
  }
}, 30000)

describe("Login to app", () => {
  it("Trying to log in without username", async () => {
    const creds = {
      password: "salainen",
    }

    const res = await request(app).post("/api/login/").send(creds)
    expect(res.status).toEqual(401)
    expect(res.body).toEqual({ error: "Missing username" })
  }, 10000)

  it("Trying to log in without password", async () => {
    const creds = {
      username: "Jimi",
    }

    const res = await request(app).post("/api/login/").send(creds)
    expect(res.status).toEqual(401)
    expect(res.body).toEqual({error: "Missing password" })
  }, 10000)

  it("Trying to log in with incorrect credentials", async () => {
    const creds = {
      username: "Pelle Peloton",
      password: "EiNiinSalainen",
    }

    const res = await request(app).post("/api/login/").send(creds)
    expect(res.status).toEqual(401)
    expect(res.body).toEqual({
      error: "Username or password incorrect",
    })
  }, 10000)

  it("Log in with correct credentials", async () => {
    const creds = {
      username: "Jimi",
      password: "salainen",
    }

    const res = await request(app).post("/api/login/").send(creds)
    expect(res.status).toEqual(200)
  }, 10000)
})
