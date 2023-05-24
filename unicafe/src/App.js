import { useState } from 'react'

const Header = ({title}) => (
    <h1>{title}</h1>
)

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({text, num}) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{num}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const getAll = () => (
    good + neutral + bad
  )

  const getAverage = () => (
    (good - bad) / getAll()
  )

  const getPositive = () => (
    good / getAll() + "%"
  )

  if (getAll() === 0){
    return (
      <p>No feedback given</p>
    )
  }
  else{
    return (
      <table>
        <tbody>
        <StatisticLine text={"good"}      num={good} />
        <StatisticLine text={"neutral"}   num={neutral} />
        <StatisticLine text={"bad"}       num={bad} />
        <StatisticLine text={"all"}       num={getAll()} />
        <StatisticLine text={"average"}   num={getAverage()} />
        <StatisticLine text={"positive"}  num={getPositive()} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  
  return (
    <div>
      <Header title={"give feedback"}/>
      
      <Button text={"good"} handleClick={addGood}/>
      <Button text={"neutral"} handleClick={addNeutral}/>
      <Button text={"bad"} handleClick={addBad}/>

      <Header title={"Statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App