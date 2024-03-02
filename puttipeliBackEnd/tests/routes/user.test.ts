import request from "supertest"
import app from "../../src/app"
import mongoose from "mongoose"
import { User } from "../../src/services/UserService/userSchema"
import { AddNewUser } from "../../src/services/UserService/userService"

// It is not possible that saved_user is anything else than usertype
// eslint-disable-next-line
// @ts-ignore
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
    await AddNewUser({ ...user }).then((response) => {
      if (response.status == "ok") {
        saved_user = response.user
      }
    })
  } catch (e) {
    throw Error("Something wrong with MongoDB..")
  }
}, 30000)

describe("Returning users from Database", () => {
  test("Get all users", async () => {
    const res = await request(app).get("/api/users/all")
    expect(res.status).toEqual(200)
    expect(res.body[0].username).toEqual("Jimi")
    expect(res.body[0].email).toEqual("validemail@gmail.com")
  }, 10000)

  test("Get user with ID", async () => {
    const res = await request(app).get("/api/users/all")

    expect(res.status).toEqual(200)
    expect(res.body[0].username).toEqual("Jimi")
    expect(res.body[0].email).toEqual("validemail@gmail.com")
  })

  test("Wrong id returns 404", async () => {
    const res = await request(app).get("/api/users/hessuhopo")
    expect(res.status).toEqual(404)
  })

  test("right id returns user", async () => {
    // It is not possible that saved_user is anything else than usertype
    // eslint-disable-next-line
    // @ts-ignore
    const res = await request(app).get(`/api/users/${saved_user.id}`)
    expect(res.status).toEqual(200)
  })
})
