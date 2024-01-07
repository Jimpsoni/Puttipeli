import { useState } from "react"
import './styles.css'


const Register = () => {
  const registerNewUser = () => {
    console.log("New user registered")
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')


  return (
    <div id='loginMaincontainer'>
    <h1 id='loginpageHeader'>Luo uusi käyttäjätunnus</h1>
    <form onSubmit={registerNewUser} id='loginForm'>
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

      <div id="passwordInput">
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
        <input
          className='textInput'
          type='password'
          placeholder='Salasana uudelleen'
          value={passwordAgain}
          onChange={(e) => {
            setPasswordAgain(e.target.value)
          }}
        />
      </div>

      <button type='submit' className='submitButton'>
        Rekisteröidy
      </button>
    </form>
  </div>
  )
}

export default Register
