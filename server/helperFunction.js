const Room = require('./room')

const randomName = (len = 6, chars = 'abcdefghjkmnopqrstwxyz0123456789') => {
    let id = '';
    while (len--)
    {
        id += chars[Math.random() * chars.length | 0];
    }
    return id;
}

const randomPlayer = (reservedPlayers) => {
    let players = ['earth', 'mars' , 'venus' , 'neptune', 'uranus' , 'jupiter', 'saturn', 'mercury'];

    let filteredPlayers = players.filter(player => !reservedPlayers.includes(player))
    console.log(filteredPlayers)
    return filteredPlayers[Math.random() * (filteredPlayers.length - 1) | 0];
}

const playerExist = (player) => {
    const players = ['earth', 'mars' , 'venus' , 'neptune', 'uranus' , 'jupiter', 'saturn', 'mercury'];

    return players.includes(player)
}

const createRoom = (rooms) => {
    const id = randomName(16)
    const room = new Room(id)

    rooms.set(id, room)
    return room
}

const findRoom = (rooms, room) => {
    return new Promise((resolve) => {
        if (!room || (room && !rooms.has(room))) {
            if (rooms.size === 0) {
                resolve(createRoom(rooms))
            }
            else {
                const room = [...rooms.entries()].find(room => room[1].clients.size < 8)
                console.log(room)
                if (!room)
                    resolve(createRoom(rooms))
                else
                    resolve(room[1])
            }
        }
        else
            resolve(rooms.get(room))
    })
}

const getInfo = (client) => {
    return {
        id: client.id,
        name: client.name,
        player: client.player,
        admin: client.admin,
        score: client.score
    }
}

const getRoomInfo = (room) => {
    return {
        id: room.id,
        active: room.active,
        time: room.time,
        rounds: room.rounds,
        language: room.language
    }
}

module.exports = {randomName, randomPlayer, playerExist, findRoom, getInfo, getRoomInfo}