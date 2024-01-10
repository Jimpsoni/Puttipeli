import Header from '../../utilitycomponents/Header'  // Utility component
import GameTab from '../../utilitycomponents/GameTab/GameTab'
import React from "react"
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

  return (
    <div id='mainContainer'>
      <Header/>
      <h2>Hei {currentUser}!</h2>

      <div className='tabContainer'>
        <div className="button">Aiemmat pelit</div>
        <div className="button">Aloita uusi peli</div>
      </div>

      <div className='tabContainer games'>
        <GameTab data={recentGame}/>
        <GameTab data={bestGame}/>
      </div>
    </div>
  )
}

export default WelcomePage
