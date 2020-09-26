import React, {useEffect} from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import queryString from 'query-string'
import { joinActionCreator, roomEventListeners, leaveRoom } from '../actions/actions'
import LobbyPlayer from '../components/LobbyPlayers'
import LobbySettings from '../components/LobbySettings'
import '../styles/Lobby.css'

function Lobby({ location }) {
    const {name, player, admin} = useSelector(state => state.room)
    const dispatch = useDispatch()
    const Room = useSelector(state => state.room.room)
    const clients = [...Room.clients.values()]

    useEffect(() => {
        let {room} = queryString.parse(location.search)
        console.log(room)
        dispatch(joinActionCreator(name, player, room))
        dispatch(roomEventListeners())

        return () => {
            leaveRoom()
        }
    }, [])

    return (
        <div id="lobbyContainer">
            <LobbySettings room={Room.id}/>
            <div id="joinedPlayers">
                <LobbyPlayer powa={admin} name={name} player={player} admin={admin} me={true}/>
                {clients.map(client => <LobbyPlayer  powa={admin} id={client.id} name={client.name} player={client.player} admin={client.admin} key={client.id}/>)}
            </div>
        </div>
    )
}

export default Lobby
