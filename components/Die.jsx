export default function Die(props) {
    const Diecolor = {backgroundColor: props.isHeld ? "#59E391" : "#FFFF"}
    return (
        <button 
            style={Diecolor} 
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}