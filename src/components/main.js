import React from 'react';
import Dice from './dice';
import Confetti from 'react-confetti'
import "../App.css"; 

function Main(props) {

    const [dices, setDices] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    function generateNewDice() {
        return { 
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDice());
        }
        return newDice
    }
    
    
    function rollDice() {
       if(!tenzies) {
            setDices(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDice()
            }))
       } else {
           setTenzies(false);
           setDices(allNewDice());
       }
    }
    
    function holdDice(id) {
        setDices(oldDice => oldDice.map((die, idx) => {
            return idx === id ? 
            {...die, isHeld: !die.isHeld} :
            die
        }));
    }

    React.useEffect(()=>{
        const allHeld = dices.every(die => die.isHeld);
        const firstValue = dices[0].value;
        const allValue = dices.every(die => die.value === firstValue);
        if(allHeld && allValue) {
            setTenzies(true);
        }
    }, [dices])
    
    return (
        <div className='container'>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice-container'>
                {dices.map((dice, index) =>
                 <Dice key={index}
                       value={dice.value}
                       isHeld={dice.isHeld}
                       holdDice={()=>holdDice(index)}
                 />)}
            </div>
            <button onClick={rollDice} className='roll-btn'> {tenzies ? "New Game" : "Roll"}</button>
        </div>
    )
}

export default Main;

