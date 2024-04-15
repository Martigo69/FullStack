import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({text, value}) => {
  if (text === "positive") {
    return (
      <tr><td>{text} </td><td> {value} %</td></tr>
    )
  }
  return (
    <tr><td>{text} </td><td> {value}</td></tr>
  )
}



const Statistics = (clicks) => {
  const total = clicks.good + clicks.neutral + clicks.bad
  const average = (clicks.good * 1 + clicks.bad * -1) / total
  const positive = clicks.good * (100/(clicks.good + clicks.neutral + clicks.bad))

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={clicks.good} />
          <StatisticLine text="neutral" value={clicks.neutral} />
          <StatisticLine text="bad" value={clicks.bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>
    setGood(good + 1)

  const handleNeutralClick = () =>
    setNeutral(neutral + 1)

  const handleBadClick = () =>
    setBad(bad + 1)

  return (
    <div>
      <Header name="Customer feedback" />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header name="Statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App