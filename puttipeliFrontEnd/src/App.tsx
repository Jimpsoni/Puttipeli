import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/mainpage"
import LoginPage from "./pages/login/login"
import Register from "./pages/register/register"
import WelcomePage from "./pages/welcomepage/welcomePage"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={MainPage} />
        <Route path='/login' Component={LoginPage} />
        <Route path='/register' Component={Register} />
        <Route path='/puttipeli' Component={WelcomePage} />
      </Routes>
    </>
  )
}

export default App
