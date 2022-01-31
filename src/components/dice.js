import React from "react";
import "../App.css";

function Dice(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#eee"
    }

    

    return (
        <div className="dice" style={style} onClick={props.holdDice}>
            {props.value}
            {props.isHeld}
        </div>
    )
}

export default Dice;