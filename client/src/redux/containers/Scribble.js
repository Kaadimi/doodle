import React, { useEffect } from 'react'
import CanvasTools from '../components/CanvasTools'
import { useSelector, useDispatch }  from 'react-redux'
import { joinActionCreator, roomEventListeners, leaveRoom } from '../actions/actions'
import queryString from 'query-string'
import Canvas from '../components/Canvas'
import Player from '../components/Players'
import Chat from '../components/Chat'
import Info from '../components/InfoBar'

function Scribble({ location }) {
    const {name, player, admin, time} = useSelector(state => state.room)
    const dispatch = useDispatch()
    const Room = useSelector(state => state.room.room)
    const clients = [...Room.clients.values()]

    useEffect(() => {
        let {room} = queryString.parse(location.search)
        if (room !== Room.id) {
          dispatch(joinActionCreator(name, player, room))
          dispatch(roomEventListeners())
        }
        console.log(room)

        return () => {
            leaveRoom()
        }
    }, [])

    return (
        <div id="outerContainer">
          <div id="infoBar">
              <Info time={time}/>
          </div>
          <div id="canvasContainer">
            <Canvas />
          </div>
          <div id="canvasTools">
            <CanvasTools />
          </div>
          <div id="chatBox">
              <Chat />
          </div>
          <div id="playersBox">
              <Player name={name} player={player} admin={admin} me={true}/>
              {clients.map(client => <Player name={client.name} player={client.player} admin={client.admin} key={client.id}/>)}
          </div>
      </div>
    )
}

export default Scribble
