import axios from "axios"

const URL = "http://localhost:3000/api/login"

export const submitLogin = (username: string, password: string): boolean => {
  const loginCred = {
    username,
    password,
  }

  axios.put(URL, loginCred)
  .then(res => console.log(res.statusText))
  .catch(e => console.log(e.response.data))

  return true
}
