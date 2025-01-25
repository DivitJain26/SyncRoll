import React from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Die from "../components/Die"

export default function App() {

    const [dice, setDice] = React.useState(() => generateAllNewDice(10))
    const [isGameOn, setIsGameOn] = React.useState(false)
    const [firstHeldValue, setFirstHeldValue] = React.useState(null)
    const [gameSettings, setGameSettings] = React.useState({
        interval: 1000,
        numberOfDice: 10,
    })
    const [isGameOver, setIsGameOver] = React.useState(false)

    const buttonRef = React.useRef(null)
    const intervalRef = React.useRef(null)
    
    var click = new Audio("assets/click2.mp3")
    var wrong = new Audio("assets/wrong.mp3")
    
    const dicesElement = dice.map(dieObj =>
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
            correctValue={dieObj.correctValue}
            numberOfDice={gameSettings.numberOfDice}
        />)

    const gameWon =
        dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    let dieContainer = {}
    if (gameSettings.numberOfDice >= 20 && window.innerWidth > 768) {
        dieContainer.gap = "1.28vw"
        dieContainer.marginBottom = "4%"
    }

    React.useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    // Cleanup the interval when the component unmounts
    React.useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, [])

    React.useEffect(() => {
        setDice(generateAllNewDice(gameSettings.numberOfDice));
        setFirstHeldValue(null);
        setIsGameOn(false);
        setIsGameOver(false);
    }, [gameSettings.numberOfDice]);

    function generateAllNewDice(num) {
        return new Array(num)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                correctValue: true,
                id: nanoid()
            }))
    }

    function roll() {
        setDice(prevDie => prevDie.map(die => {
            return !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die
        }))
    }

    function toggleGame() {
        setIsGameOn(prev => {
            const newGameState = !prev;

            clearInterval(intervalRef.current);
            // setDice(generateAllNewDice())
            setDice(generateAllNewDice(gameSettings.numberOfDice))
            setFirstHeldValue(null)
            setIsGameOver(false)

            if (newGameState) {
                intervalRef.current = setInterval(roll, gameSettings.interval);
            }

            return newGameState;
        })
    }

    function hold(id) {
        if (!isGameOn || isGameOver) return;

        setDice(prevDie => prevDie.map(die => {
            if (die.id === id) {
                if (!die.isHeld && firstHeldValue === null) {
                    click.play()
                    setFirstHeldValue(die.value)
                }
                if (die.value === firstHeldValue || firstHeldValue === null) {
                    click.play()
                    return { ...die, isHeld: true }
                } else {
                    wrong.play()
                    clearInterval(intervalRef.current);
                    setIsGameOver(true);
                    return { ...die, isHeld: true, correctValue: false }
                }
            } else {
                return die
            }
        }))
    }

    function handleChange(event) {
        const { value, name } = event.target
        setGameSettings(prevSettings => ({ ...prevSettings, [name]: Number(value) }))
    }

    return (
        <main>
            {gameWon && <Confetti
                width={window.innerWidth}
                height={window.innerHeight} /> 
            }
            
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">SyncRoll</h1>
            <p className="instructions">Click on rolling dice to freeze them. Make all dice show the same value to win!</p>

            <div className="dropdown-div">
                <label htmlFor="interval">Mode</label>

                <label htmlFor="numberOfDice">Dice</label>

                <select
                    name="interval"
                    value={gameSettings.interval}
                    onChange={handleChange}
                    disabled={isGameOn ? true : false}
                >
                    <option value={1500}>Easy</option>
                    <option value={1000}>Medium</option>
                    <option value={600}>Hard</option>
                    <option value={100}>Nightmare</option>
                </select>

                <select
                    name="numberOfDice"
                    value={gameSettings.numberOfDice}
                    onChange={handleChange}
                    disabled={isGameOn ? true : false}
                >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                </select>
            </div>

            <div 
                style={dieContainer}
                className="dice-container"
            >{dicesElement} 
            </div>

            <button
                className="roll-dice"
                onClick={toggleGame}
                ref={buttonRef}
            >{isGameOn ? "New Game" : isGameOver ? "New Game" : "Start"}</button>
            <button onClick={() => click.play()}>kk</button>
        </main>
    )
}
