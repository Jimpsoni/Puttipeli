import request from "supertest"
import app from "../../src/app"

describe("Login to app", () => {
  it("Trying to log in without username", async () => {
    const data = {
      password: "salasana",
    }

    const res = await request(app).post("/api/login/").send(data)
    expect(res.status).toEqual(401)
    expect(res.body).toEqual("Missing username")
  })

  it("Trying to log in without password", async () => {
    const data = {
        username: "admin",
    }

    const res = await request(app).post("/api/login/").send(data)
    expect(res.status).toEqual(401)
    expect(res.body).toEqual("Missing password")
  })

  it("Trying to log in with incorrect credential", async () => {
    const data = {
        username: "VääräKäyttäjäNimi",
        password: "salasana"
    }

    const res = await request(app).post("/api/login/").send(data)
    expect(res.status).toEqual(401)
    expect(res.body).toEqual("Incorrect username or password")
  })

  it("Log in with correct credentials", async () => {
    const data = {
        username: "admin",
        password: "salasana"
    }

    const res = await request(app).post("/api/login/").send(data)
    expect(res.status).toEqual(200)
  })
})
