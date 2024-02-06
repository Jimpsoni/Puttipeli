import { useNavigate } from "react-router-dom"
import "./styles.css"
import { Dispatch, useState } from "react"

const saveScoreToUser = () => {
  console.log("Sending scores to database")
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
        <div onClick={saveScoreToUser}>Kyllä</div>
        <div onClick={closeModal}>Ei</div>
      </div>
    </>
  )
}

const Game = () => {
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
    const shots =
      document.getElementById("successfulShots")?.childNodes[current]
    const d = document.getElementById("distance")?.childNodes[current]

    if (d && shots) {
      d.textContent = `${distance}`
      shots.textContent = `${shotsInBasket}`
    }

    // So that js doesn't rewrite the values before calculation
    const addPoints = distance * shotsInBasket
    const nextDistance = defaultDistance + shotsInBasket

    setDistance(nextDistance)
    setPoints(points + addPoints)

    setCurrent(current + 1)
  }

  if (current >= 10) {
    openModal(true)
  }
  return (
    <>
      <Modal open={modal} setOpen={openModal} />
      <div>
        <h1>Game Page</h1>
        <h2 className='infoHeader'>Points: {points}</h2>
        <h2 className='infoHeader'>Throw from: {distance}</h2>
        <table>
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
        </table>

        <div>
          <button onClick={() => submitScore(0)}>0</button>
          <button onClick={() => submitScore(1)}>1</button>
          <button onClick={() => submitScore(2)}>2</button>
          <button onClick={() => submitScore(3)}>3</button>
          <button onClick={() => submitScore(4)}>4</button>
          <button onClick={() => submitScore(5)}>5</button>
        </div>

        <div>
          <div onClick={goBack}>Takaisin</div>
          {current >= 9 && (
            <>
              <div onClick={saveScoreToUser}>Tallenna Tulos</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Game
