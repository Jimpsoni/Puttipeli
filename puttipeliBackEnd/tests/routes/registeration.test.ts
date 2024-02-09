import request from "supertest"
import app from "../../src/app"

describe("Registering a new user to app", () => {
  it("Can't create user without username", async () => {
    const data = {
      passwordHash: "salasana",
      email: "testi@gmail.com",
    }

    const res = await request(app).post("/api/register/").send(data)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ errors: ["Username is required"] })
  })

  it("Can't create user with too short username", async () => {
    const data = {
      username: "ji",
      passwordHash: "salasana",
      email: "testi@gmail.com",
    }

    const res = await request(app).post("/api/register/").send(data)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ errors: ["Username not long enough"] })
  })

  it("Can't create user without password", async () => {
    const data = {
      username: "Testikäyttäjä",
      email: "testi@gmail.com",
    }

    const res = await request(app).post("/api/register/").send(data)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ errors: ["Password is required"] })
  })

  it("Can't create user without email", async () => {
    const data = {
      username: "Testikäyttäjä",
      passwordHash: "salasana",
    }

    const res = await request(app).post("/api/register/").send(data)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ errors: ["Email is required"] })
  })

  it("Can't create user with invalid email address", async () => {
    const data = {
      username: "Testikäyttäjä",
      passwordHash: "salasana",
      email: "sähköposti",
    }

    const res = await request(app).post("/api/register/").send(data)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ errors: ["Invalid Email address"] })
  })

  it("With Correct data, create user", async () => {
    const data = {
      username: "Testikäyttäjä",
      passwordHash: "salasana",
      email: "testi@gmail.com",
    }

    const res = await request(app).post("/api/register/").send(data)
    expect(res.status).toEqual(201)
  })
})
