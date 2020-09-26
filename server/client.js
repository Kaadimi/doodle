class Client {
    constructor(socket, name, player)
    {
        this.socket = socket;
        this.id = socket.id;
        this.name = name;
        this.player = player;
        this.score = 0;
        this.admin = false;
        this.room = null;
        this.imageData = null;
    }
}

module.exports = Client