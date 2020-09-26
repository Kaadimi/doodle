import { HIDE_ERROR, JOIN_FAILURE, JOIN_REQUEST, JOIN_SUCCESS, SET_ADMIN, SET_LANGUAGE, SET_NAME, SET_PLAYER, SET_ROUNDS, SET_TIME, UNSET_ADMIN, UPDATE_ROOM, UPDATE_ROOM_INFO } from "../actions"

const initialState = {
    loading: true,
    room: {
        id: '',
        clients: new Map()
    },
    id: '',
    name: '',
    player: '',
    messages: [],
    error: '',
    rounds: 8,
    time: 90,
    language: 'english',
    admin: false
}

const RoomReducer = ((state = initialState, {type, payload}) => {
    switch (type) {
        case UNSET_ADMIN:
            return {
                ...state,
                admin: false
            }
        case UPDATE_ROOM_INFO:
            return {
                ...state,
                rounds: payload.rounds,
                time: payload.time,
                language: payload.language
            }
        case SET_ROUNDS:
            return {
                ...state,
                rounds: payload
            }
        case SET_TIME:
            return {
                ...state,
                time: payload
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: payload
            }
        case HIDE_ERROR:
            return {
                ...state,
                error: ''
            }
        case UPDATE_ROOM:
            return {
                ...state,
                room: payload
            }
        case SET_NAME:
            return {
                ...state,
                name: payload
            }
        case SET_PLAYER:
            return {
                ...state,
                player: payload
            }
        case JOIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case JOIN_FAILURE: {
            return {
                ...state,
                loading: false,
                error: payload
            } 
        }
        case JOIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                id: payload.id,
                name: payload.name,
                player: payload.player,
                admin: payload.admin
            } 
        }
        case SET_ADMIN:
            return {
                ...state,
                admin: true
            }
        default :
            return state
    }
})

export default RoomReducer