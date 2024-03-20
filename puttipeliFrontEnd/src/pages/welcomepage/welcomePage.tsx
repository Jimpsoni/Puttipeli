import Header from "../../utilitycomponents/Header" // Utility component
import GameTab from "../../utilitycomponents/GameTab/GameTab"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import userContext from "../../services/userContext"
import "./styles.css"

/*
  Muistilista
  TODO:
    - Tervehdys currentUser käyttää käyttäjän omaa nimeä

  ehdotuksia:
    - Viikon parhaat pisteet laatikkoon saa itse valita minkä ajan parhaat pisteet haluaa
      siihen (vko, kk, vv, alltime)?
*/

interface ShowGameInterface {
  games: string[]
}

const ShowGames = (props: ShowGameInterface) => {
  if (props.games.length < 1) {
    return (
      <div className='tabContainer games'>
        <div>Ei vielä pelejä näytettäväksi</div>
      </div>
    )
  }
  
  // TODO hae käyttäjältä pelin tiedot
  const recentGame = {
    date: new Date(),
    points: 339,
    hitpercent: 59,
  }

  // TODO hae käyttäjältä pelin tiedot
  const bestGame = {
    date: new Date(),
    points: 459,
    hitpercent: 76,
  }

  return (
    <div className='tabContainer games'>
      <h3 className='gamesSubHeader'>Viimeisin</h3>
      <GameTab data={recentGame} />
      <h3 className='gamesSubHeader'>Viikon paras</h3>
      <GameTab data={bestGame} />
    </div>
  )
}

const WelcomePage = () => {
  const nav = useNavigate()
  const [user, setUser] = useContext(userContext)
  const StartNewGame = () => {
    nav("/uusi_peli")
  }

  useEffect(() => {
    if (user == null) {
      nav("/login")
    }
  }, [])

  return (
    <div id='mainContainer'>
      <Header />
      <h2>Hei {user && user.username}!</h2>

      <div className='tabContainer'>
        <div className='button'>Aiemmat pelit</div>
        <div className='button' onClick={StartNewGame}>
          Aloita uusi peli
        </div>
      </div>

      <ShowGames games={user.games} />
    </div>
  )
}

export default WelcomePage
