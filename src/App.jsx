import React from "react"
import { useWindowSize } from 'react-use'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Die from "../components/Die"

export default function App() {

    const [dice, setDice] = React.useState(() => generateAllNewDice())

    const buttonRef = React.useRef(null)
    
    const gameWon =
        dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)
        
    React.useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    const { width, height } = useWindowSize()
 
    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }
    
    // console.log(dice)

    
    function rollDice() {
        gameWon 
        ? setDice(generateAllNewDice())
        : setDice(prevDie => prevDie.map(die => {
            return !die.isHeld ? {...die, value: Math.ceil(Math.random() * 6)} : die 
        }))
    }

    function hold(id) {
        setDice(prevDie => prevDie.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    const dicesElement = dice.map(dieObj =>
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />)

    return (
        <main>
            
            {gameWon && <Confetti
                width={window.innerWidth } 
                height={window.innerHeight}/>
            }
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {dicesElement}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice} 
                ref={buttonRef}
            >{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}


