import React from 'react'
import '../styles/sideContainers.css'

function Players({ player, name, admin, me }) {
    return (
        <div className="players">
            {me ? <span id="identifier">YOU</span> : null}
            <div>
                {admin ? <img id="miniAdminCrown" src={process.env.PUBLIC_URL +'/crown.png'} alt="adminIcon"></img> : null}
                <img src={process.env.PUBLIC_URL +'/' + player + '.png'} alt="playerIcon" id="playerIcon"></img>
                <span id="playerScore">0</span>
            </div>
            <label id="nameLabel">{ name }</label>
        </div>
    )
}

export default Players
