import React from 'react'
import { Link } from 'react-router-dom'
import JoinForm from '../components/JoinForm'
import '../styles/Join.css'

function Join() {
    return (
        <div className="JoinContainer">
            <div id="logoContainer">
                <img alt="logo" id="logoImage" src={process.env.PUBLIC_URL + '/doodle3.png'}></img>
            </div>
            <JoinForm />
            <div className="JoinActions">
            <Link onClick={event => null } to={`/play`}>
                <button id="PlayButton">PLAY</button>
            </Link>
            <Link onClick={event => null } to={`/lobby`}>
                <button id="PrivateRoomButton">CREATE PRIVATE ROOM</button>
            </Link>
            </div>
        </div>
    )
}

export default Join
