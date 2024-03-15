import request from "supertest"
import app from "../../src/app"
import mongoose from "mongoose"
import { User } from "../../src/services/UserService/userSchema"
import { AddNewUser } from "../../src/services/UserService/userService"
import { checkIfObjectIsUser } from "../../src/services/helperFunctions"

/*
Tests to implement:
  - If id is not in right format, send a message about that
  - Check that returned user object doesn't have password with it
*/

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
      if (checkIfObjectIsUser(response)) {
        saved_user = response
      } else {
        throw new Error()
      }
    })
  } catch (e) {
    throw new Error("Issues with MongoDB")
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
    // Create new id
    const id = new mongoose.Types.ObjectId()
    const res = await request(app).get(`/api/users/${id}`)
    expect(res.status).toEqual(404)
  })

  test("right id returns user", async () => {
    // @ts-expect-error: It is not possible that saved_user is anything else than usertype
    const res = await request(app).get(`/api/users/${saved_user.id}`)
    expect(res.status).toEqual(200)
  })
})

describe("Deleting user from database", () => {
  test("We have user in our db", async () => {
    // @ts-expect-error: It is not possible that saved_user is anything else than usertype
    const res = await request(app).get(`/api/users/${saved_user.id}`)
    expect(res.status).toEqual(200)
    expect(res.body.username).toEqual("Jimi")
    expect(res.body.email).toEqual("validemail@gmail.com")
  }, 10000)

  test("Wrong id returns 404", async () => {
    const id = new mongoose.Types.ObjectId()
    const res = await request(app).delete(`/api/users/${id}`)
    expect(res.status).toEqual(404)
    expect(res.text).toEqual("No user with that ID")
  }, 10000)

  test("Correct user returns 204", async () => {
    // @ts-expect-error: It is not possible that saved_user is anything else than usertype
    const res = await request(app).delete(`/api/users/${saved_user.id}`)
    expect(res.status).toEqual(204)
  }, 10000)

  test("There is no user in DB after delete", async () => {
    // @ts-expect-error: It is not possible that saved_user is anything else than usertype
    const res = await request(app).get(`/api/users/${saved_user.id}`)
    expect(res.status).toEqual(404)
  }, 10000)
})
