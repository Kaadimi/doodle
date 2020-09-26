class Room {
    constructor(id)
    {
        this.id = id;
        this.clients = new Set;
        this.reservedPlayers = []
        this.active = false
        this.time = 90
        this.rounds = 8
        this.language = 'english'
    }

    join(client) {
        return new Promise((resolve, reject) => {
            if (client.room)
                reject('Client already in room');
            else {
                let len = this.clients.size
            
                if (len > 7)
                    reject('This room reached its limit of 8')
                else
                {
                    if (len === 0)
                        client.admin = true
                    this.clients.add(client);
                    client.room = this;
                    resolve('connection to room is successful')
                }
            }
        })
    }

    leave(client)
    {
        this.clients.delete(client);
        client.room = null;
    }

    nextRoomAdmin()
    {
        if (this.clients.size > 0) {
            [...this.clients][0].admin = true
            return [...this.clients][0] 
        }
        return null
    }
}

module.exports = Room