import "./styles.css"

interface GameTabProps {
  data: {
    date: Date
    points: number
  }
}

const ParseDate = (date: Date): string => {
  const pvm = date.toLocaleDateString()
  const klo = date.toLocaleTimeString()
  return pvm + ' ' + klo
}

const GameTab = (props: GameTabProps) => {
  const data = props.data
  return (
    <div className='gameContainer'>
      <ul className='gameList'>
        <li>{ParseDate(data.date)}</li>
        <li>pisteet: {data.points}</li>
      </ul>
    </div>
  )
}

export default GameTab
