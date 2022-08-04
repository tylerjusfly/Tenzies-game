import './assets/App.css'
import React from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  
  function allNewDice(){
    let randomnums = []

    for (let i = 0; i < 10; i++) {
      randomnums.push(generateNewDie())
    }
    return randomnums
  }

  function generateNewDie(){
    return {
      value : Math.floor((Math.random() * 6) + 1),
      isheld : false, 
      id : nanoid(5)
    }
  }
  // creating state to hold array of nums
  const [DiceNums, setDiceNums] = React.useState(allNewDice())
  const [numOfrolls, setNumOfRolls] = React.useState(0)

  const [tenzies, setTenzies] = React.useState(false)
  React.useEffect(() => {
    let allHeld = DiceNums.every(dice => dice.isheld === true)
    const first = DiceNums[0].value
    let allValue = DiceNums.every(dice => dice.value === first)
     
    if(allHeld && allValue === true ){
      setTenzies(true)
    }
    else{
      setTenzies(false)
    }
    
  }, DiceNums)

  const diceElements = DiceNums.map(dice => {
    return (
      <Die 
      value={dice.value} 
      key = {dice.id}
      isHeld={dice.isheld}
      hold={()=> {hold(dice.id)}}
      />
    )
  })

  function reRollDice(){
    if(!tenzies){
      setNumOfRolls(prevWins => prevWins + 1)
      setDiceNums(oldDice => oldDice.map(die => {
        return die.isheld == false ? generateNewDie() : die
          }))
    }
    else{
      let high = localStorage.getItem("highestRoll")
      if(!high){ localStorage.setItem("highestRoll", numOfrolls)}
      else{ 
        numOfrolls < high ? localStorage.setItem('highestRoll', numOfrolls) 
              : localStorage.setItem('highestRoll', high) 
            }

      setTenzies(false)
      setNumOfRolls(0)
      
      setDiceNums(allNewDice())
    }
  }

  function hold(id){
      setDiceNums(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isheld : !die.isheld} : die
      }))
  } 

  return (
    <main>
      {tenzies && <Confetti/>}
      <div>Number of Rolls  : {numOfrolls}</div>
      <div>Best Roll : {localStorage.getItem("highestRoll")}</div>
      <div className="title"> Tenzies By TylerJusFly </div>
      <div className="game--plan">
        Roll until the dice are the same <p> Click on each die to freeze it at its current value between rolls </p>
      </div>
      
      <div className="die-container">
       {diceElements}
      </div>
      <button className='roll-dice-button' onClick={reRollDice}>{tenzies ? "New Game": "Roll Dice"}</button>
    </main>
  )
}
