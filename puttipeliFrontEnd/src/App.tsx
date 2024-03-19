// React
import { Route, Routes } from "react-router-dom"
import userContext from "./services/userContext.ts"

// Pages
import MainPage from "./pages/mainpage"
import LoginPage from "./pages/login/login"
import Register from "./pages/register/register"
import WelcomePage from "./pages/welcomepage/welcomePage"
import Game from "./pages/game/Game"
import { useState } from "react"

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <userContext.Provider value={[user, setUser]}>
        <Routes>
          <Route path='/' Component={MainPage} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={Register} />
          <Route path='/puttipeli' Component={WelcomePage} />
          <Route path='/uusi_peli' Component={Game} />
        </Routes>
      </userContext.Provider>
    </>
  )
}

export default App
