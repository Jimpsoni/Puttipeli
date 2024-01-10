import Header from '../../utilitycomponents/Header'  // Utility component
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
        <div className="game">
          <ul>
            <li>14.12.23 klo 13:35</li>
            <li>Pisteet: 339</li>
            <li>Osumis %: 45</li>
          </ul>
        </div>
        <div className="game">Tähän viikon parhaat pisteet</div>
      </div>
    </div>
  )
}

export default WelcomePage
