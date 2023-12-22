import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/mainpage"
import LoginPage from "./pages/login/login"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={MainPage} />
        <Route path='/login' Component={LoginPage} />
      </Routes>
    </>
  )
}

export default App
