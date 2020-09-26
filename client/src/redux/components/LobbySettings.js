import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { playGame } from '../actions/actions'
import { setLanguage, setRounds, setTime } from '../actions/JoinActions'

function LobbySettings({ room }) {
    const dispatch = useDispatch()
    const {rounds, time, language} = useSelector(state => state.room)

    return (
        <div id="lobbySettings">
            <label id="settingTitle">GAME SETTINGS</label>
            <form id="settingForm">
                <label className="labels">NUMBER OF ROUNDS</label>
                <div className="sliders">
                    <input className="rangeSlider" type="range" onChange={(e) => dispatch(setRounds(e.target.value))} value={rounds} min="4" max="16"></input>
                     <span className="sliderValue">{rounds}</span>
                </div>
                <label className="labels">DRAWING TIME</label>
                <div className="sliders">
                    <input className="rangeSlider" type="range" onChange={(e) => dispatch(setTime(e.target.value))} value={time} min="60" max="120"></input>
                    <span className="sliderValue">{time}</span>
                </div>
                <label className="labels">LANGUAGE</label>
                <select id="languageSelect" onChange={(e) => dispatch(setLanguage(e.target.value))} value={language}>
                    <option>English</option>
                </select>
                <button id="settingSubmit" onClick={(e) => playGame(e, {room, rounds, time, language })} type="submit">PLAY</button>
            </form>
        </div>
    )
}

export default LobbySettings
