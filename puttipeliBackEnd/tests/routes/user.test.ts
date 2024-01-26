import request from "supertest"
import app from "../../src/app"

describe("Get user", () => {
  it("returns 200 if user found", async () => {
    const res = await request(app).get("/api/user/1")
    expect(res.status).toEqual(200)
  })

  it("response has data with it", async () => {
    const res = await request(app).get("/api/user/1")
    console.log(res.body)
    expect(res.body.id).toEqual("1")
    expect(res.body.username).toEqual("Jimi")
    expect(res.body.passwordHash).toEqual("salasana")
    expect(res.body.games).toEqual([])
    expect(res.body.dob).toEqual("2001-04-17T00:00:00.000Z")
    expect(res.body.registered).toEqual("2024-01-01T00:00:00.000Z")
  })
})
