const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const router = require('./router')
const Client = require('./client')
const {getRoomInfo, randomPlayer, playerExist, findRoom, getInfo} = require('./helperFunction')
const rooms = new Map

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server, {pingTimeout: 30000})

io.on('connect', socket => {
    console.log('user connected')
    const client = new Client(socket)

    socket.on('play', ({rounds, time, language}) => {
        console.log('plaaaaaaay')
        let room = client.room

        if (room) {
            console.log("playing room  " + room.id)
            room.rounds = rounds
            room.time = time
            room.language = language
            room.active = true
            socket.broadcast.to(room.id).emit('play', {id: room.id, rounds, time, language})
        }
    })

    socket.on('newAdmin', (id, callback) => {
        if (client.room && id) {
            console.log('admin id  ' + id)
            socket.broadcast.to(client.room.id).emit('newAdmin', id, client.id)
            callback(true)
        }
    })

    socket.on('join', ({name, player, room}, callback) => {
        console.log('user play button')
        findRoom(rooms, room)
        .then(room => {
            if (!player || !playerExist())
                player = randomPlayer(room.reservedPlayers)
            if (!name)
                name = player
            room.reservedPlayers.push(player)
            client.name = name;
            client.player = player
            room.join(client)
            .then(res => {
                const clients = [...room.clients.values()].filter(peer => client.id !== peer.id)
                const peers = clients.map(peer => getInfo(peer))

                socket.join(room.id)
                socket.broadcast.to(room.id).emit('userJoined',
                {
                    roomId: room.id,
                    peer: getInfo(client)
                })
                callback({success: true, Room: getRoomInfo(room), peers, me: getInfo(client)})
            })
        })
        .catch(error => {console.log(error);callback({success: false, error})})
    })

    socket.on('disconnect', () => {
        console.log('user Disconnected')
        const room = client.room
        if (room) {
            room.leave(client)
            if (room.clients.size === 0)
                rooms.delete(room.id)
            else {
                // room.reservedPlayers.splice(indexOf())
                if (client.admin) {
                    const admin = room.nextRoomAdmin()
                    admin.socket.emit('newAdmin')
                }
                socket.broadcast.to(room.id).emit('userLeft',
                {
                    roomId: room.id,
                    userId: client.id
                })
            }
        }
    })
})

app.use(cors())
app.use(router)

server.listen(PORT, () => console.log(`server has start on port ${PORT}`))