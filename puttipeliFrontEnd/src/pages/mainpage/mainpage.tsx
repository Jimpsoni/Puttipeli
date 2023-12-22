import Logo from "./components/Logo"
import Button from "./components/Button"
import "./mainpagestyles.css"

const login = () => {
  // THE LOGIN ACTION
  console.log("Redirecting to the login page...")
  return null
}

const createUser = () => {
  // THE CREATE NEW USER ACTION
  console.log("Redirecting to the create new user page...")
  return null
}

const continueWithoutSignin = () => {
  // THE CONTINUE WITHOUT SIGNING IN ACTION
  console.log("Going to mainpage without sign in...")
  return null
}

const MainPage = () => {
  return (
    <>
      <div id='mainpageContainer'>
        <Logo />
        <div id='buttonContainer'>
          <Button header={"Kirjaudu sisään"} action={login} />
          <Button header={"Luo Käyttäjätili"} action={createUser} />
          <Button header={"Kirjaudu sisään"} action={continueWithoutSignin} />
        </div>
      </div>
    </>
  )
}

export default MainPage
