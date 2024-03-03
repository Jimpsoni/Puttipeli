import { useState } from "react"
import React from "react"
import "./loginpageStyles.css"
import { submitLogin } from "./utils"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const highlightError = (e: string[]) => {
    for(const error in e) {
      console.log(error)
    }
  }

  const login = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const res = await submitLogin(username, password)

    if (res.status == "ok") {
      navigate("/puttipeli")
    } else {
      highlightError(res.error)
    }
  }

  return (
    <>
      <div id='loginMaincontainer'>
        <h1 id='loginpageHeader'>Kirjaudu sisään</h1>
        <form onSubmit={login} id='loginForm'>
          <div>
            <input
              className='textInput'
              type='text'
              placeholder='Käyttäjätunnus'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>

          <div>
            <input
              className='textInput'
              type='password'
              placeholder='Salasana'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>

          <div>
            <input type='checkbox' /> Muista minut
          </div>

          <button type='submit' className='submitButton'>
            Kirjaudu
          </button>
        </form>
      </div>
    </>
  )
}

export default LoginPage
