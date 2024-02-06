import "./styles.css"

interface GameTabProps {
  data: {
    date: Date
    points: number
    hitpercent: number
  }
}

const GameTab = (props: GameTabProps) => {
  const data = props.data
  return (
    <div className='gameContainer'>
      <ul className='gameList'>
        <li>14.12.23 klo 13:35</li>
        <li>pisteet: {data.points}</li>
        <li>Osumis%: {data.hitpercent}%</li>
      </ul>
    </div>
  )
}

export default GameTab
