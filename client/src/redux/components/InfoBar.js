import React from 'react'

function InfoBar( {time} ) {
    const hiddenWord = "banana"

    const stringSplit = (string) => {
        let arr = []
        for (let i = 0; i < string.length; i++)
            arr.push(string[i])
        return arr;
    }
    return (
        <div id="infoContainer">
            <img src={process.env.PUBLIC_URL + '/blackhole2.png'} alt="timer" id="timer"></img>
            <span id="time">{time}</span>
            <div id="hiddenWord">
                {stringSplit(hiddenWord).map((letter, index) => <span key={index} className="letters">{letter}</span>)}
            </div>
        </div>
    )
}

export default InfoBar
