import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import userContext from "../../services/userContext"
import axios from "axios"
import "./styles.css"

const Register = () => {
  // Form control
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")

  const { setUser } = useContext(userContext)
  const [email, setEmail] = useState("")
  
  // Navigation
  const navigate = useNavigate()

  function NotifyField(id: string, _message: string) {
    // Highlights the field that has invalid values
    const elem = document.getElementById(id)
    elem?.classList.add("error")
  }

  function handleErrorMessages(errors: string[]) {
    // Username
    if (errors.includes("Username not long enough")) NotifyField("username", "Käyttäjänimen tulee olla vähintään n merkin pitkä")
    if (errors.includes("Username already in use")) NotifyField("username", "Tämä käyttäjä nimi on jo käytössä")

    // Email
    if (errors.includes("Invalid Email address")) NotifyField("email", "Sähköposti ei ole kelvollinen")
    if (errors.includes("Email Already in use")) NotifyField("email", "Sähköposti on jo käytössä")
  }

  const registerNewUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const data = {
      username,
      password,
      email,
    }

    axios
      .post("http://localhost:3000/api/register", data)
      .then((res) => {
        // Clear the form 
        setUsername("")
        setPassword("")
        setPasswordAgain("")
        setEmail("")
        // Login the user
        setUser(res.data.user)
        
        // navigate
        navigate('/puttipeli')
      })
      .catch((e) => {
        const response = e.response.data.errors
        handleErrorMessages(response)
      })
  }

  return (
    <div id='RegisterMainContainer'>
      <h1 id='loginpageHeader'>Luo uusi käyttäjätunnus</h1>
      <form onSubmit={registerNewUser} id='registerForm'>
        <div>
          <input
            id='username'
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
            id='email'
            className='textInput'
            type='text'
            placeholder='Sähköposti'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>

        <div id='passwordInput'>
          <input
            id='password'
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
            id='passwordAgain'
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
