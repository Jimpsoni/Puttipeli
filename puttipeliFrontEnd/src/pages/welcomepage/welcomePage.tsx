import Header from "../../utilitycomponents/Header" // Utility component
import GameTab from "../../utilitycomponents/GameTab/GameTab"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import userContext from "../../services/userContext"
import { Game } from "../../types"
import "./styles.css"

/*
  Muistilista
  TODO:
    - Jos käyttäjä ei ole kirjautunut, ohjaa kirjautumis sivulle

  ehdotuksia:
    - Viikon parhaat pisteet laatikkoon saa itse valita minkä ajan parhaat pisteet haluaa
      siihen (vko, kk, vv, alltime)?
*/

interface ShowGameInterface {
  games: Game[]
}

const ShowGames = (props: ShowGameInterface) => {
  if (props.games.length < 1) {
    return (
      <div className='tabContainer games'>
        <div>Ei vielä pelejä näytettäväksi</div>
      </div>
    )
  }

  // Finds the largest point and returns the object
  const bestGame = props.games.reduce(function (prev, current) {
    return prev && prev.points > current.points ? prev : current
  })

  // Modify the date to be a date object
  bestGame["date"] = new Date(bestGame["date"])

  const latestGame = props.games[props.games.length - 1]

  const recentGame = {
    date: new Date(latestGame.date),
    points: latestGame.points,
  }

  return (
    <div className='tabContainer games'>
      <h3 className='gamesSubHeader'>Viimeisin</h3>
      <GameTab data={recentGame} />
      <h3 className='gamesSubHeader'>Paras pelisi</h3>
      <GameTab data={bestGame} />
    </div>
  )
}

const WelcomePage = () => {
  const nav = useNavigate()
  const { user } = useContext(userContext)

  const StartNewGame = () => {
    nav("/uusi_peli")
  }

  useEffect(() => {
    if (user == null) {
      nav("/login")
    }
  }, [user, nav])

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

      {user && <ShowGames games={user.games} />}
    </div>
  )
}

export default WelcomePage
