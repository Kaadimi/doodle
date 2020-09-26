import socket from '../socket'
import history from '../history'

import { SET_ADMIN, UNSET_ADMIN, UPDATE_ROOM, UPDATE_ROOM_INFO } from "."

export const updateRoom = (payload) => {
    return {
        type: UPDATE_ROOM,
        payload
    }
}

export const updateRoomInfo = (payload) => {
    return {
        type: UPDATE_ROOM_INFO,
        payload
    }
}

export const leaveRoom = () => {
    socket.disconnect()
    socket.off()
}

export const playGame = (event, payload) => {
    event.preventDefault()
    socket.emit('play', payload)
    history.push(`/play?room=${payload.room}`)
}

const powerShift = (newAdmin, oldAdmin) => {
    return function(dispatch, getState) {
        const id = getState().room.id
        const room = getState().room.room
        const user = room.clients.get(newAdmin)
        const user2 = room.clients.get(oldAdmin) 

        if (id === newAdmin)
            dispatch(setAdmin())
        if (id === oldAdmin)
            dispatch(unsetAdmin())
        if (user) {
            console.log("new admin")
            user.admin = true
            room.clients.delete(newAdmin) 
            room.clients.set(newAdmin, user)
            dispatch(updateRoom({id: room.id, clients: room.clients}))
        }
        if (user2) {
            console.log("oldAdmin")
            user2.admin = false
            room.clients.delete(oldAdmin) 
            room.clients.set(oldAdmin, user2)
            dispatch(updateRoom({id: room.id, clients: room.clients}))
        }
    }
}

export const roomEventListeners = () => {
    return function(dispatch, getState) {

        socket.on('newAdmin', (newAdmin, oldAdmin) => {
            dispatch(powerShift(newAdmin, oldAdmin))
        })

        socket.on('play', (room) => {
            console.log(room)
            dispatch(updateRoomInfo(room))
            history.push(`/play?room=${room.id}`)
        })

        socket.on('userJoined', ({roomId, peer}) => {
            const room = getState().room.room
            const users = [...room.clients.keys()]

            if (!users.find(user => user === peer.id)) {
                room.clients.set(peer.id, peer)
                dispatch(updateRoom({id: roomId, clients: room.clients}))
            }
        })

        socket.on('userLeft', ({roomId, userId}) => {
            const room = getState().room.room
            const users = [...room.clients.keys()]

            if (users.find(user => user === userId)) {
                room.clients.delete(userId)
                dispatch(updateRoom({id: roomId, clients: room.clients}))
            }
        })
    }
}

const setAdmin = () => {
    return {
        type: SET_ADMIN
    }
}

const unsetAdmin = () => {
    return {
        type: UNSET_ADMIN
    }
}

const ulterAdmin = (id) => {
    return function(dispatch, getState) {
        const room = getState().room.room
        const user = room.clients.get(id)

        if (user) {
            user.admin = true
            room.clients.delete(id) 
            room.clients.set(id, user)
            dispatch(updateRoom({id: room.id, clients: room.clients}))
        }
    }
}

export const changeAdmin = (id) => {
    return function(dispatch) {
        socket.emit('newAdmin', id, response => {
            if (response) {
                dispatch(unsetAdmin())
                dispatch(ulterAdmin(id))
            }
        })
    }
}