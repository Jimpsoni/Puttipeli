import { getByID } from "../../src/services/userService"

// Mock tests, real tests when userService is implemented
describe("userService", () => {
  it("finds user by ID", () => {
    const user = getByID("1")
    if (!user) throw new TypeError()
    expect(user.username).toEqual("Jimi")
  })

  it("Handles id not found", () => {
    expect(getByID("2")).toEqual(null)
  })
})
