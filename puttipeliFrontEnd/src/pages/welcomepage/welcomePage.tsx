import Header from '../../utilitycomponents/Header'  // Utility component
import GameTab from '../../utilitycomponents/GameTab/GameTab'
import { useNavigate } from 'react-router-dom'
import "./styles.css"

/*
  Muistilista
  TODO:
    - Tervehdys currentUser käyttää käyttäjän omaa nimeä

  ehdotuksia:
    - Viikon parhaat pisteet laatikkoon saa itse valita minkä ajan parhaat pisteet haluaa
      siihen (vko, kk, vv, alltime)?
*/



const recentGame = {
  date: new Date(),
  points: 339,
  hitpercent: 59
}

const bestGame = {
  date: new Date(),
  points: 459,
  hitpercent: 76
}



const WelcomePage = () => {
  const currentUser = "Admin"
  const nav = useNavigate()


  const StartNewGame = () => {
    nav('/uusi_peli')
  }

  return (
    <div id='mainContainer'>
      <Header/>
      <h2>Hei {currentUser}!</h2>

      <div className='tabContainer'>
        <div className="button">Aiemmat pelit</div>
        <div className="button" onClick={StartNewGame}>Aloita uusi peli</div>
      </div>

      <div className='tabContainer games'>
        <h3 className='gamesSubHeader'>Viimeisin</h3>
        <GameTab data={recentGame}/>
        <h3 className='gamesSubHeader'>Viikon paras</h3>
        <GameTab data={bestGame}/>
      </div>
    </div>
  )
}

export default WelcomePage
