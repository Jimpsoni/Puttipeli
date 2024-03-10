import { useNavigate } from "react-router-dom"
import "./styles.css"
import { Dispatch, useState } from "react"

const saveScoreToUser = (results: Results[]) => {
  console.log("Sending scores to database")
  console.log(results)
}

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
        <div onClick={() => saveScoreToUser}>Kyllä</div>
        <div onClick={closeModal}>Ei</div>
      </div>
    </>
  )
}

interface Results {
  distance: number,
  shotsInBasket: number
}

const Game = () => {
  const [results, setResults] = useState<Results[]>([])
  const [distance, setDistance] = useState(10)
  const [points, setPoints] = useState(0)
  const [current, setCurrent] = useState(0)
  const [modal, openModal] = useState<boolean>(false)
  const nav = useNavigate()

  const defaultDistance = 5

  const goBack = () => {
    nav("/puttipeli")
  }

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
    console.log(current)

    if (current <= 10) {
      const shots =
        document.getElementById("successfulShots")?.childNodes[current - 1]
      const d = document.getElementById("distance")?.childNodes[current - 1]

      if (d && shots) {
        d.textContent = ``
        shots.textContent = ``
      }

    }
    else {
      const shots =
        document.getElementById("successfulShots2")?.childNodes[current - 11]
      const d = document.getElementById("distance2")?.childNodes[current  - 11]

      if (d && shots) {
        d.textContent = ``
        shots.textContent = ``
      }
    }

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

  if (current >= 22) {
    //openModal(true)
  }

  return (
    <>
      <Modal open={modal} setOpen={openModal} />
      <div>
        <h1>Game Page</h1>
        <h2 className='infoHeader'>Points: {points}</h2>
        <h2 className='infoHeader'>Throw from: {distance} m</h2>
        <table>
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
            <tr id='distance'>
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
            <tr id='successfulShots'>
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
            <tr id='distance2'>
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
            <tr id='successfulShots2'>
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

        <div>
          <button onClick={() => prevScore()}>takaisin</button>
          {current <= 19 && (
            <>
              <button onClick={() => submitScore(0)}>0</button>
              <button onClick={() => submitScore(1)}>1</button>
              <button onClick={() => submitScore(2)}>2</button>
              <button onClick={() => submitScore(3)}>3</button>
              <button onClick={() => submitScore(4)}>4</button>
              <button onClick={() => submitScore(5)}>5</button>
            </>
          )}
        </div>

        <div>
          <div onClick={goBack}>Palaa päävalikkoon</div>
          {current >= 1 && (
            <>
              <div onClick={() => saveScoreToUser(results)}>Tallenna kierros</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Game
