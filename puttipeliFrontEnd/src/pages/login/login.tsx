import { useState } from "react"
import React from "react"
import "./loginpageStyles.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const URL = "http://localhost:3000/api/login"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const highlightError = (e) => {
    /*

    TODO Better error handling

    */
    alert(e.error)
  }

  const submitLogin = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const loginCred = { username, password }
    axios
      .post(URL, loginCred)
      .then((res) => {
        if ("data" in res) {
          navigate("/puttipeli")
        } else {
          highlightError("Server error")
        }
      })
      .catch((res) => {
        
        highlightError(res.response.data.error)
      })
  }

  return (
    <>
      <div id='loginMaincontainer'>
        <h1 id='loginpageHeader'>Kirjaudu sisään</h1>
        <form onSubmit={submitLogin} id='loginForm'>
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
