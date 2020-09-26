import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import EditDialog from '../containers/EditDialog'
import { changeAdmin } from '../actions/actions'
import '../styles/sideContainers.css'

function LobbyPlayers({ powa, id, name, player, admin, me}) {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)

    return (
        <div className="lobbyPlayers">
            {edit ? <EditDialog setEdit={setEdit}/> : null}
            <img id="adminCrown" onClick={() => !me && powa ? dispatch(changeAdmin(id)) : null} className={!admin ? "invertColor" : null} src={process.env.PUBLIC_URL +'/crown.png'} alt="adminIcon"></img>
            {me ? <img id="editIcon" onClick={() => setEdit(true)} src={process.env.PUBLIC_URL +'/wrench.png'} alt="editIcon"></img> : null}
            <div>
                <img src={process.env.PUBLIC_URL +'/' + player + '.png'} alt="playerIcon" id="playerIcon"></img>
            </div>
            <label id="nameLabel">{name}</label>
        </div>
    )
}

export default LobbyPlayers
