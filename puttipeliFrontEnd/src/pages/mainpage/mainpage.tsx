import { useNavigate } from "react-router-dom"
import Logo from "./components/Logo"
import Button from "./components/Button"
import "./mainpagestyles.css"

const MainPage = () => {
  const navigate = useNavigate() // Used for routing

  const login = () => {
    // Redirect user to the login page
    console.log("Redirecting to the login page...")
    navigate('/login')
  }

  const createUser = () => {
    // Redirect user to the new user page
    console.log("Redirecting to the create new user page...")
    navigate('/register')
  }

  const continueWithoutSignin = () => {
    // Redirect user to the game
    console.log("Going to mainpage without sign in...")
    navigate('/puttipeli')
  }

  return (
    <>
      <div id='mainpageContainer'>
        <Logo />
        <div id='buttonContainer'>
          <Button header={"Kirjaudu sisään"} action={login} />
          <h3 id='mainpageSubHeader'>Uusi pelaaja?</h3>
          <Button header={"Luo Käyttäjätili"} action={createUser} />
          <Button header={"Jatka kirjautumatta"} action={continueWithoutSignin} />
        </div>
      </div>
    </>
  )
}

export default MainPage
