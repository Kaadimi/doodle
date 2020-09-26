import { JOIN_REQUEST, JOIN_FAILURE, JOIN_SUCCESS, SET_NAME, SET_PLAYER, HIDE_ERROR, SET_ROUNDS, SET_TIME, SET_LANGUAGE } from "."
import { updateRoom, updateRoomInfo } from "./RoomActions"
import history from '../history'
import socket from '../socket'

export const setName = (payload) => {
    return {
        type: SET_NAME,
        payload
    }
}

export const setPlayer = (payload) => {
    return {
        type: SET_PLAYER,
        payload
    }
}

export const setRounds = (payload) => {
    return {
        type: SET_ROUNDS,
        payload
    }
}

export const setTime = (payload) => {
    return {
        type: SET_TIME,
        payload
    }
}

export const setLanguage = (payload) => {
    return {
        type: SET_LANGUAGE,
        payload
    }
}

export const hideErrorBox = () => {
    return {
        type: HIDE_ERROR
    }
}

const joinRequest = () => {
    return {
        type: JOIN_REQUEST
    }
}

export const joinFailure = (payload) => {
    return {
        type: JOIN_FAILURE,
        payload
    }
}

const joinSuccess = (payload) => {
    return {
        type: JOIN_SUCCESS,
        payload
    }
}

export const joinActionCreator = (name, player, room) => {
    console.log('wtf')
    return function (dispatch) {
        console.log("join action creator " + name + " " + player + " " + room)
        dispatch(joinRequest())
        socket.connect()
        socket.emit('join', {name, player, room}, (response) => {
            console.log(response)
            if (response.success) {
                const clients = new Map()
                const {Room, peers, me} = response

                if (peers) {
                    peers.forEach(peer => {
                        clients.set(peer.id, peer)
                    })
                    dispatch(updateRoom({id: Room.id, clients}))
                }
                if (!room) {
                    if (Room.active)
                        history.replace('/play?room=' + Room.id)
                    else
                        history.replace('/lobby?room=' + Room.id) 
                }
                dispatch(updateRoomInfo(Room))
                dispatch(joinSuccess(me))
            }
            else if (response.error)
                dispatch(joinFailure(response.error))
            else
                dispatch(joinFailure("something went wrong"))
        })
    }
}