import "./styles.css"
import React, { useState } from "react"

const Game = () => {
  const [distance, setDistance] = useState(10)
  const [points, setPoints] = useState(0)
  const [current, setCurrent] = useState(0)

  const defaultDistance = 5

  const submitScore = (shotsInBasket: number) => {
    const shots = document.getElementById('successfulShots')?.childNodes[current]
    const d = document.getElementById('distance')?.childNodes[current]

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

  return (
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
      </table>

      <div>
        <button onClick={() => submitScore(0)}>0</button>
        <button onClick={() => submitScore(1)}>1</button>
        <button onClick={() => submitScore(2)}>2</button>
        <button onClick={() => submitScore(3)}>3</button>
        <button onClick={() => submitScore(4)}>4</button>
        <button onClick={() => submitScore(5)}>5</button>
      </div>
    </div>
  )
}

export default Game
