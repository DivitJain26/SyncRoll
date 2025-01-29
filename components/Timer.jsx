import React from "react";

export default function Timer(props) {

    const [time, setTime] = React.useState(0)
    
    const [fontStyle, setFontStyle] = React.useState({});

    React.useEffect(() => {
        let interval = null;
        
        if (props.isGameOn && !props.isGameOver) {
            interval = setInterval(() => {
                setTime(time => time + 10)
            }, 10)
        }

        if (!props.isGameOn && !props.isGameOver) {
            setFontStyle({ color: "#000" })
            setTime(0)
        }

        if (props.isGameOn && props.isGameOver) {
            setFontStyle({ color: "#F4010D" })
        }
        
        if (props.gameWon) {
            clearInterval(interval)
            setFontStyle({ color: "#59E391" })
        }
        
        return () => {
            clearInterval(interval)
        }

    }, [props.gameWon, props.isGameOn, props.isGameOver])

    // console.log(props.gameWon, props.isGameOn, props.isGameOver)

    return (
        <div style={fontStyle} className="timer">
            <span className="digits">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
            </span>
            <span className="digits mili-sec">
                {("0" + ((time / 10) % 100)).slice(-2)}
            </span>
        </div>
    )
}