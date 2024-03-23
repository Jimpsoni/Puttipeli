// @ts-nocheck
import request from "supertest"
import app from "../../src/app"
import mongoose from "mongoose"
import { User } from "../../src/services/UserService/userSchema"
import { AddNewUser } from "../../src/services/UserService/userService"

let saved_user

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
    saved_user = await AddNewUser({ ...user })
  } catch (e) {
    throw Error("Something wrong with MongoDB")
  }
}, 30000)

describe("Saving games to db", () => {
  it("Sending game without userid", async () => {
    const game = {
      game: [],
    }
    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Could not find 'userid' in request")
  }, 10000)

  it("Sending game without game", async () => {
    const game = {
      userid: saved_user.id,
    }
    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Could not find 'game' in request")
  }, 10000)

  it("Sending game that is not array", async () => {
    const game = {
      userid: saved_user.id,
      game: "Score: 200",
    }

    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Game is not array of size 20")
  }, 10000)

  it("Sending game that not length 20", async () => {
    const game = {
      userid: saved_user.id,
      game: [{ distance: 2, shotsInBasket: 2 }],
    }

    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Game is not array of size 20")
  }, 10000)

  it("Sending game that is longer than 20", async () => {
    const game = {
      userid: saved_user.id,
      game: [
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
      ],
    }

    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Game is not array of size 20")
  }, 10000)

  it("Sending game that string instead of int", async () => {
    const game = {
      userid: saved_user.id,
      game: [
        { distance: 2, shotsInBasket: "2" },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
      ],
    }

    const res = await request(app).post("/api/game/submit").send(game)
    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Game array has illegal values")
  }, 10000)

  it("Sending game that has illegal key", async () => {
    const game = {
      userid: saved_user.id,
      game: [
        { distance: 2, shotsInBaskets: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
      ],
    }

    const res = await request(app).post("/api/game/submit").send(game)
    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Game array has illegal values")
  }, 10000)

  it("Sending game that has illegal key", async () => {
    const game = {
      userid: saved_user.id,
      game: [
        { distance: 2, shotsInBaskets: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distances: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
        { distance: 2, shotsInBasket: 2 },
      ],
    }

    const res = await request(app).post("/api/game/submit").send(game)
    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Game array has illegal values")
  }, 10000)

  it("Game with incorrect id is not accepted", async () => {
    const game = {
      userid: new mongoose.Types.ObjectId(),
      game: [
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
      ],
    }

    const res = await request(app).post("/api/game/submit").send(game)
    expect(res.status).toEqual(400)
    expect(res.text).toEqual("No user with that ID")
  }, 10000)

  it("Game with correct values is accepted", async () => {
    const game = {
      userid: saved_user.id,
      game: [
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
        { distance: 10, shotsInBasket: 5 },
      ],
    }

    const res = await request(app).post("/api/game/submit").send(game)
    expect(res.status).toEqual(201)
    expect(res.text).toEqual("Saved game to user")
  }, 10000)
})
