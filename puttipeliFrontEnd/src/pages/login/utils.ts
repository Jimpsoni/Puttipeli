import axios from "axios"

const URL = "http://localhost:3000/api/login"

type Result =
  | { status: "ok"; user: string }
  | { status: "error"; error: string }

export const submitLogin = async (
  username: string,
  password: string
): Promise<Result> => {
  const loginCred = { username, password }

  const response = await axios
    .post(URL, loginCred)
    .then((res) => {
      if ('data' in res) {
        return res.data.user
      }
    })
    .catch((res) => {
      return res.response.data
    })

  return response
}
