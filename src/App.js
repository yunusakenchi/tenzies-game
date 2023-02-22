import React from 'react';
import logo from './logo.svg';
import './App.css';
import Die from './Die';
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDie())
  const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

  const diceElement = dice.map(index =>  <Die key={index.id} {...index} holdDice={() => holdDice(index.id)} />)

  function generateNewDice() {
    return {value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid()}
  }

  function allNewDie() {
    let dieArray = [];
    for (let i = 0; i < 10; i++) {
      dieArray.push(generateNewDice())
    }
    return dieArray
  }

  function shuffle() {
    if (!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld === true ? die : generateNewDice()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDie())
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className='die-container'>
        {diceElement}
      </div>
      <button className='roll-button' onClick={shuffle}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
