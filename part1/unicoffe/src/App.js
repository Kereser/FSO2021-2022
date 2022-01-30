import React, { useState } from 'react'

const Statistics = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Button = ({ title, func }) => {
  return (
    <button onClick={func}>{title}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)

  const handleClickNeutral = () => setNeutral(neutral + 1)

  const handleClickBad = () => setBad(bad + 1)

  console.log(good, neutral, bad);
  const total = good + neutral + bad
  

  return (
    <div>
      <h1>GIVE FEEDBACK</h1>
      <Button title='Good' func={handleClickGood} />
      <Button title='Neutral' func={handleClickNeutral} />
      <Button title='Bad' func={handleClickBad} />
      <h1>STATISTICS</h1>
      {total === 0
        ? 'No feedback given.'
        :
        <table>
          <Statistics text='Good' value={good} />
          <Statistics text='Neutral' value={neutral} />
          <Statistics text='Bad' value={bad} />
          <Statistics text='All' value={total} />
          <Statistics text='Average' value={Number(((good - bad) / total)).toFixed(2)} />
          <Statistics text='Positive' value={`${Number(((good / total) * 100)).toFixed(1)}%`} />
        </table>
      }

    </div>
  )
}

export default App