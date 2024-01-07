import request from "supertest"
import app from "../../src/app"

describe("Get user", () => {
  it("returns 200 if user found", async () => {
    const res = await request(app).get("/api/user/1")
    expect(res.status).toEqual(200)
  })

  it("response has data with it", async () => {
    const res = await request(app).get("/api/user/1")

    expect(res.body).toEqual({
      id: "1",
      name: "Jimi",
      dob: new Date("2001-04-17"),
      registered: new Date("2024-01-01"),
      games: [],
    })
  })
})
