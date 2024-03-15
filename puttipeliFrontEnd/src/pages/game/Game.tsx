import { useNavigate } from "react-router-dom"
import "./styles.css"
import { Dispatch, useState } from "react"
import { GameResult } from "../../types.ts"
import { postGameResult } from "../../services/gameService"
import axios from "axios"
import { TbArrowBackUp } from "react-icons/tb";


interface ModalTypes {
  open: boolean,
  setOpen: Dispatch<boolean>
}

const Modal = (props: ModalTypes) => {
  console.log("Open modal")
  if (!props.open) return

  const closeModal = () => {
    props.setOpen(false)
  }

  return (
    <>
      <div id='overlay' onClick={closeModal}></div>
      <div id='popup'>
        <h2>Tallennetaanko?</h2>
        <div onClick={closeModal}>Kyllä</div>
        <div onClick={closeModal}>Ei</div>
      </div>
    </>
  )
}

const Game = () => {
  const [results, setResults] = useState<GameResult[]>([])
  const [distance, setDistance] = useState(10)
  const [points, setPoints] = useState(0)
  const [current, setCurrent] = useState(0)
  const [modal, openModal] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const nav = useNavigate()

  const defaultDistance = 5

  const submitScore = (shotsInBasket: number) => {
    if (current < 10) {
      const shots =
        document.getElementById("successfulShots")?.childNodes[current]
      const d = document.getElementById("distance")?.childNodes[current]

      if (d && shots) {
        d.textContent = `${distance}`
        shots.textContent = `${shotsInBasket}`
      }
    }
    else {
      const shots =
        document.getElementById("successfulShots2")?.childNodes[current - 10]
      const d = document.getElementById("distance2")?.childNodes[current - 10]

      if (d && shots) {
        d.textContent = `${distance}`
        shots.textContent = `${shotsInBasket}`
      }
    }

    // So that js doesn't rewrite the values before calculation
    const addPoints = distance * shotsInBasket
    const nextDistance = defaultDistance + shotsInBasket

    setResults(results.concat({distance, shotsInBasket}))

    setDistance(nextDistance)
    setPoints(points + addPoints)
    setCurrent(current + 1)
  }

  const prevScore = () => {
    //if current is zero, go back to main menu
    if (current === 0) {
      nav("/puttipeli")
    }
    
    //if current is over 10, remove score from upper row
    if (current <= 10) {
      const shots =
        document.getElementById("successfulShots")?.childNodes[current - 1]
      const d = document.getElementById("distance")?.childNodes[current - 1]

      if (d && shots) {
        d.textContent = ``
        shots.textContent = ``
      }

    }
    //if current is over 10, remove score from lower row
    else {
      const shots =
        document.getElementById("successfulShots2")?.childNodes[current - 11]
      const d = document.getElementById("distance2")?.childNodes[current  - 11]

      if (d && shots) {
        d.textContent = ``
        shots.textContent = ``
      }
    }

    //if on any other round, get last distance from array. Else -> default distance
    if (results.length > 1) {
      setDistance(results[results.length-1].distance)
    } else {
      setDistance(10)
    }

    results.pop()
    setResults(results)
    
    let points = 0
    for (let i = 0; i < results.length; i++) {
      points += results[i].distance * results[i].shotsInBasket
    }
    setPoints(points)

    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  const saveScoreToUser = async (results: GameResult[]) => {
    console.log("Sending scores to database")
    setMessage('Saving round')
  
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await postGameResult(results)
      console.log(response)
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
        setMessage(error.message)
        setIsError(true)
        setTimeout(() => {
          setMessage('')
          setIsError(false)
        }, 5000)
      }
    }
  }

  if (current >= 22) {
    //openModal(true)
  }

  return (
    <>
      <Modal open={modal} setOpen={openModal} />
      <div style={{display: "grid"}}>
        <div className="stats">
          <h1>Game Page</h1>
          <h2 className='infoHeader' data-testid="points">Points: {points}</h2>
          <h2 className='infoHeader' data-testid="distance">Throw from: {distance} m</h2>
        </div>

        <table className="round_table">
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
            </tr>
            <tr id='distance' className="round_data">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr id='successfulShots' className="round_data">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="empty_cells">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              {}
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
            </tr>
            <tr id='distance2' className="round_data">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr id='successfulShots2' className="round_data">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="empty_cells">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div id="buttons">
          <button className="returnbutton" data-testid="prevButton" onClick={() => prevScore()}>{<TbArrowBackUp />}</button>
          {current <= 19 && (
            <>
              <button className="scorebutton" data-testid="button0" onClick={() => submitScore(0)}>0</button>
              <button className="scorebutton" data-testid="button1" onClick={() => submitScore(1)}>1</button>
              <button className="scorebutton" data-testid="button2" onClick={() => submitScore(2)}>2</button>
              <button className="scorebutton" data-testid="button3" onClick={() => submitScore(3)}>3</button>
              <button className="scorebutton" data-testid="button4" onClick={() => submitScore(4)}>4</button>
              <button className="scorebutton" data-testid="button5" onClick={() => submitScore(5)}>5</button>
            </>
          )}
          {current > 19 && (
            <>
              {message.length > 1 && !isError && (
                <button className="scorebutton" id="savingScore" data-testid="saveScoreButton">
                  {message} 
                </button>
              )}
              {message.length < 1 && (
                <button className="scorebutton" data-testid="saveScoreButton" 
                  onClick={() => saveScoreToUser(results)}>
                    Tallenna tulos
                </button>
              )}
              {isError && (
                <button className="scorebutton" id="savingError" data-testid="saveScoreButton">
                  {message}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Game
