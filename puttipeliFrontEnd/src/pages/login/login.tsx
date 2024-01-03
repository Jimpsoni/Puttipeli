import { useState } from "react"
import "./loginpageStyles.css"
import { submitLogin } from "./utils"

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (submitLogin(username, password)) {
      console.log("logged in!")
    } else {
      console.log("not logged in...")
    }

  }

  return (
    <>
      <div id='loginMaincontainer'>
        <h1 id='loginpageHeader'>Kirjaudu sisään</h1>
        <form onSubmit={login} id='loginForm'>
          <div>
            <input 
            type='text' 
            placeholder='Käyttäjätunnus' 
            value={username}
            onChange={e => {setUsername(e.target.value)}}
            />
          </div>

          <div>
            <input 
            type='password' 
            placeholder='Salasana' 
            value={password}
            onChange={e => {setPassword(e.target.value)}}
            />
          </div>

          <div>
            <input type='checkbox' /> Muista minut
          </div>

          <button type='submit'>Kirjaudu</button>
        </form>
      </div>
    </>
  )
}

export default LoginPage
