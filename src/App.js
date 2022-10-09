import React from "react"
import './App.css';
import Die from "./components/Die"
import {nanoid} from "nanoid"
import JSConfetti from "react-confetti"

function App() {
  const [totalRoll, setTotalRoll] = React.useState(0)
  const [dice, setDice] = React.useState(initDice)
  const [tenzies, setTenzies] = React.useState(false)
  const [best, setBest] = React.useState(
    localStorage.getItem("best roll") || null
  )
 
  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      if(!best || totalRoll < best){
        setBest(totalRoll);

      }
      setTenzies(true)
    }
  }, [dice])
  
  React.useEffect(()=>{
    localStorage.setItem("best roll", best);
  }, [best])

  function initDice(){
    const arr = [];
    for(let i = 0; i < 10; i++){
      arr.push(getNewDie())
    }
    return arr;
  }
  function getNewDie(){
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }
  }
  function handleRoll(){
    if(!tenzies){
      setTotalRoll(prev => prev+1)
      setDice(prev => prev.map(die =>{
        return die.isHeld !== true 
              ? getNewDie()
              : die
      }));
    } else{
      
      setDice(initDice())
      setTenzies(false)
      setTotalRoll(0)
      
    }
  }

  function handleCellClick(id){
    setDice(prev => prev.map(die => {
      return die.id === id 
            ? {...die, isHeld: !die.isHeld}
            : die
    }))
  }

  const diceElements = dice.map(die => {
    return <Die key={die.id} 
                value={die.value} 
                isHeld={die.isHeld}
                onClick={() => handleCellClick(die.id)}
            />
  })

  return (
    <div className="App">
      {tenzies && <JSConfetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="Board">
        {diceElements}
      </div>
      <button onClick={handleRoll}>{tenzies ? "new game" : "Roll"}</button>
      <div className="stats">
        <p>{best ? `Your best roll is ${best}.` : "no best score"}</p>
      </div>
    </div>
  );
}

export default App;
