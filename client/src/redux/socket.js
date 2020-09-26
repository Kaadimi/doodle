import io from 'socket.io-client'

const ENDPOINT = 'localhost:5000'
const socket = io(ENDPOINT, {pingTimeout: 30000})

export default socket