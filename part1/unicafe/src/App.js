import { useState } from 'react'

const Statistic = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (<p>No feedback given</p>)
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={good + neutral + bad} />
        <StatisticLine text='average' value={(good + neutral * 0 + bad * -1) / (good + neutral + bad)} />
        <StatisticLine text='positive' value={`${good / (good + neutral + bad) * 100}%`} />
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App