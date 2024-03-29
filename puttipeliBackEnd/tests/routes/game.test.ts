import request from "supertest"
import app from "../../src/app"
import mongoose from "mongoose"
import { User } from "../../src/services/UserService/userSchema"
import { Game } from "../../src/services/GameService/gameSchema"
import { AddNewUser } from "../../src/services/UserService/userService"

// @ts-expect-error: We don't run tests if saved_user is not UserType
let saved_user
const roundsObject = [
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
]

beforeAll(async () => {
  // Add user to database
  const user = {
    username: "Jimi",
    password: "salainen",
    email: "validemail@gmail.com",
  }
  try {
    await mongoose.connect(process.env.DBURI as string)
    await User.collection.drop()
    await Game.collection.drop()
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
      rounds: roundsObject,
    }

    const res = await request(app).post("/api/game/submit").send(game)
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty("userid")
    expect(res.body).toHaveProperty("points")
    expect(res.body).toHaveProperty("rounds")
    expect(res.body).toHaveProperty("date")
  }, 10000)
})

describe("Database works accordingly", () => {
  // Delete this game from db
  // @ts-expect-error: We don't run tests if user is not usertype
  let gameID

  it("Sending game to database", async () => {
    const game = {
      // @ts-expect-error: We don't run tests if user is not usertype
      // eslint-disable-next-line
      userid: saved_user.id,
      points: 250,
      rounds: roundsObject,
      date: new Date(Date.now()),
    }

    const res = await request(app).post("/api/game/submit").send(game)

    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty("userid")
    expect(res.body).toHaveProperty("points")
    expect(res.body).toHaveProperty("rounds")
    expect(res.body).toHaveProperty("date")

    // @ts-expect-error: We don't run tests if user is not usertype
    // eslint-disable-next-line
    const res2 = await request(app).get(`/api/game/user/${saved_user.id}`)
    expect(res2.status).toEqual(200)
    expect(res2.body).toHaveProperty("Games")
    expect(res2.body.Games.length).toBe(2)
    
    // eslint-disable-next-line 
    gameID = res2.body.Games[0].id
  })

  it("Delete game from database", async () => {
    // @ts-expect-error: We don't run tests if game is not gametype
    // eslint-disable-next-line
    const res = await request(app).delete(`/api/game/${gameID}`)
    expect(res.status).toEqual(204)
  })

  it("User only has one game after deleting the other", async () => {
    // @ts-expect-error: We don't run tests if game is not gametype
    // eslint-disable-next-line
    const res = await request(app).get(`/api/game/user/${saved_user.id}`)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty("Games")
    expect(res.body.Games.length).toBe(1)
  })

  it("Wrong IDs responds accordingly", async () => {
    const res = await request(app).delete(`/api/game/qweqwe`)
    expect(res.status).toEqual(400)

    const res2 = await request(app).get(`/api/game/user/qweqwe`)
    expect(res2.status).toEqual(400)
  })


})
