import request from "supertest"
import app from "../../src/app"
import mongoose from "mongoose"
import { User } from "../../src/services/UserService/userSchema"

beforeAll(async () => {
  // Clean up the test db
  console.log(process.env.DB_URI)
  await mongoose.connect(process.env.DB_URI as string)
  await User.collection.drop()
})

describe("Registering a new user to app", () => {
  it("Can't create user with too short username", async () => {
    const data = {
      username: "ji",
      password: "salasana",
      email: "testi@gmail.com",
    }

    const res = await request(app).post("/api/register/").send(data)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ errors: ["Username not long enough"] })
  })

  it("Can't create user with invalid email address", async () => {
    const data = {
      username: "Testikäyttäjä",
      password: "salasana",
      email: "sähköposti",
    }

    const res = await request(app).post("/api/register/").send(data)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ errors: ["Invalid Email address"] })
  })

  it("With Correct data, create user", async () => {
    const data = {
      username: "Testikäyttäjä",
      password: "salasana",
      email: "testi@gmail.com",
    }

    const res = await request(app).post("/api/register/").send(data)
    expect(res.status).toEqual(201)
  })
})

describe("Can't create duplicates", () => {
  it("Can't create user with same username", async () => {
    const data1 = {
      username: "Testaaja",
      password: "salasana",
      email: "testi123@gmail.com",
    }

    const data2 = {
      username: "Testaaja",
      password: "salasana",
      email: "testi1123@gmail.com",
    }

    const first_res = await request(app).post("/api/register/").send(data1)
    expect(first_res.status).toEqual(201)

    const second_res = await request(app).post("/api/register/").send(data2)
    expect(second_res.status).toEqual(400)
    expect(second_res.body).toEqual({
      errors: ["Username already in use"],
    })
  })

  it("Can't create user with same email", async () => {
    const data1 = {
      username: "Testeri",
      password: "salasana",
      email: "testi321@gmail.com",
    }

    const data2 = {
      username: "Testeri123",
      password: "salasana",
      email: "testi321@gmail.com",
    }

    const first_res = await request(app).post("/api/register/").send(data1)
    expect(first_res.status).toEqual(201)

    const second_res = await request(app).post("/api/register/").send(data2)
    expect(second_res.status).toEqual(400)
    expect(second_res.body).toEqual({
      errors: ["Email Already in use"],
    })
  })
})
