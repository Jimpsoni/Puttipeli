import request from "supertest"
import app from "../../src/app"
import mongoose from "mongoose"
import { User } from "../../src/services/UserService/userSchema"
import { AddNewUser } from "../../src/services/UserService/userService"

// @ts-expect-error: We don't run tests if saved_user is not UserType
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

describe("Sending request to save game to db", () => {
  it("Sending game without userid", async () => {
    const game = {
      points: 250,
      rounds: [],
      date: new Date(Date.now()),
    }
    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Could not find 'userid' in request")
  }, 10000)

  it("Sending game without 'rounds'", async () => {
    const game = {
      userid: "NewID",
      points: 250,
      date: new Date(Date.now()),
    }
    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Could not find 'rounds' in request")
  }, 10000)

  it("Sending game without 'date'", async () => {
    const game = {
      userid: "NewID",
      points: 250,
      rounds: [],
    }
    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Could not find 'date' in request")
  }, 10000)

  it("Sending game without 'points'", async () => {
    const game = {
      userid: "NewID",
      date: new Date(Date.now()),
      rounds: [],
    }
    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Could not find 'points' in request")
  }, 10000)

  it("Sending game that is not array", async () => {
    const game = {
      userid: "NewID",
      date: new Date(Date.now()),
      points: 200,
      rounds: "Score: 200",
    }

    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Game is not array of size 20")
  }, 10000)

  it("Sending game that not length 20", async () => {
    const game = {
      userid: "NewID",
      date: new Date(Date.now()),
      points: 200,
      rounds: [{ distance: 2, shotsInBasket: 2 }],
    }

    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Game is not array of size 20")
  }, 10000)

  it("Sending game that is longer than 20", async () => {
    const game = {
      userid: "NewID",
      date: new Date(Date.now()),
      points: 200,
      rounds: [
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
      userid: "NewID",
      date: new Date(Date.now()),
      points: 200,
      rounds: [
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
      userid: "NewID",
      date: new Date(Date.now()),
      points: 200,
      rounds: [
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
      userid: "NewID",
      date: new Date(Date.now()),
      points: 200,
      rounds: [
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
      date: new Date(Date.now()),
      points: 200,
      rounds: [
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
      // @ts-expect-error: We don't run tests if user is not usertype
      // eslint-disable-next-line
      userid: saved_user.id, //
      date: new Date(Date.now()),
      points: 200,
      rounds: [
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
