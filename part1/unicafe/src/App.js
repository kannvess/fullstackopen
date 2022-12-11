import { useState } from 'react'

const Statistic = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (<p>No feedback given</p>)
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine result={`good ${good}`} />
      <StatisticLine result={`neutral ${neutral}`} />
      <StatisticLine result={`bad ${bad}`} />
      <StatisticLine result={`all ${good + neutral + bad}`} />
      <StatisticLine result={`average ${(good + neutral * 0 + bad * -1) / (good + neutral + bad)}`} />
      <StatisticLine result={`positive ${good / (good + neutral + bad) * 100}%`} />
    </div>
  )
}

const StatisticLine = ({result}) => (
  <p>{result}</p>
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