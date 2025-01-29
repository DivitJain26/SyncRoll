export default function Die(props) {
    let Die = {}

    if (props.isHeld) {
        if (props.correctValue === true) {
            Die.backgroundColor = "#59E391"
        } else {
            Die.backgroundColor = "#F4010D"
        }
    } else {
        // Die.backgroundColor = "#FFFF"
    }

    if (window.innerWidth > 768) {
        if (props.numberOfDice == 15) {
            Die.height = "6vw"
            Die.width = "6vw"
            Die.fontSize = "2.57vw"
        }
        if (props.numberOfDice == 20) {
            Die.height = "5vw"
            Die.width = "5vw"
            Die.fontSize = "2.14vw"
        }
        if (props.numberOfDice == 25) {
            Die.height = "4.5vw"
            Die.width = "4.55vw"
            Die.fontSize = "1.92vw"
        }
    }

    return (
        <div className="die" 
            style={Die} 
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >
            <span className={`dot a ${props.value >= 2 ? "show" : ""}`}></span>
            <span></span>
            <span className={`dot b ${props.value >= 4 ? "show" : ""}`}></span>
            <span className={`dot c ${props.value === 6 ? "show" : ""}`}></span>
            <span className={`dot d ${props.value % 2 !== 0 ? "show" : ""}`}></span>
            <span className={`dot e ${props.value === 6 ? "show" : ""}`}></span>
            <span className={`dot f ${props.value >= 4 ? "show" : ""}`}></span>
            <span></span>
            <span className={`dot g ${props.value >= 2 ? "show" : ""}`}></span>
        </div>
    )
}