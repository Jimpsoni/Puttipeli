import { getByID } from "../../src/services/UserService/userService"

// Mock tests, real tests when userService is implemented
describe("userService", () => {
  it("finds user by ID", () => {
    // eslint-disable-next-line
    const user = getByID("1")
    if (!user) throw new TypeError()
    expect(user.username).toEqual("Jimi")
  })

  it("Handles id not found", () => {
    // eslint-disable-next-line
    expect(getByID("2")).toEqual(null)
  })
})
