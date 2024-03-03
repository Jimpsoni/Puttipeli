import axios from "axios"

const URL = "http://localhost:3000/api/login"

type Result<T> =
  | { status: "ok"; user: string }
  | { status: "error"; error: T[] }

export const submitLogin = async (
  username: string,
  password: string
): Promise<Result<string>> => {
  const loginCred = { username, password }

  const response = await axios
    .post(URL, loginCred)
    .then((res) => {
      if ('response' in res) {
        console.log(res.response)
      }
    })
    .catch((res) => {
      return res.response.data
    })

  return response
}
