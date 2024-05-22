import { useState } from 'react'

const StatisticLine = (props) => {
  return (<tr><td>{props.text}</td><td>{props.value}</td></tr>)
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  if (good + neutral + bad == 0) {
    return <p>No feedback given</p>
  }
  const statistics = {
    total: good + neutral + bad,
    average: (good - bad) / (good + bad + neutral),
    percentage: good * 100 / (good + bad + neutral)
  }
  return (
    <>
    <h3>statistics</h3>
    <table>
    <tbody>
    <StatisticLine text='good' value={good} />      
    <StatisticLine text='neutral' value={neutral} />      
    <StatisticLine text='bad' value={bad} />
    <StatisticLine text="all" value={statistics.total} />
    <StatisticLine text="average" value={statistics.average} />
    <StatisticLine text="positive" value={statistics.percentage + " %"} />
    </tbody>
    </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App