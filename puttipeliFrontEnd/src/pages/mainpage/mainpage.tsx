import Logo from "./components/Logo"
import Button from "./components/Button"
import "./mainpagestyles.css"

const login = () => {
  // THE LOGIN ACTION
  console.log("Redirecting to the login page...")
  return null
}

const MainPage = () => {
  return (
    <>
      <div id='mainpageContainer'>
        <Logo />
        <div id='buttonContainer'>
          <Button header={'Kirjaudu sisään'} action={login}/>

        </div>
      </div>
    </>
  )
}

export default MainPage
