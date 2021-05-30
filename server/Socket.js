const {Server} = require('socket.io')
const Database = require('./Database')

class Socket {
    io;
    logger;
    roomsDb;

    constructor(server) {
        this.roomsDb = Database.GetDatabase("rooms")
        this.io = new Server(server)
        this.io.on('connection', this.onConnect)
    }

    onConnect(socket) {
        console.log("User connected to socket")
        socket.on('create_room', (cb) => {
            const newId = Utils.NewId();
            this.roomsDb.findOne({_id: newId}, (err, doc) => {
                if (err !== undefined || doc != null) {
                    cb({
                        id: null,
                        error: err ?? "Room already exists",
                    })
                    return;
                }

                cb({
                    id: newId,
                    error: undefined,
                })
            })
        })

        socket.on('check_room', (roomId, cb) => {
            this.roomsDb.findOne({_id: roomId}, (err, doc) => {
                if (err !== undefined || doc === null) {
                    cb({
                        roomExists: false,
                        err: err
                    })
                } else {
                    cb({
                        roomExists: true,
                        err: undefined
                    })
                }
            })
        })

        socket.on('join_room', (roomId, cb) => {
            this.io.of("/").adapter.rooms.get(roomId).size
            socket.join(roomId)
        })
    }


}
