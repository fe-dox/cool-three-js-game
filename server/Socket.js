const {Server} = require('socket.io')
const Database = require('./Database')
const Utils = require('./Utils')

class Socket {
    io;
    logger;
    roomsDb;

    constructor(server) {
        this.roomsDb = Database.GetDatabase("rooms")
        console.log(this.roomsDb)
        this.io = new Server(server)
        this.io.on('connection', (socket) => this.onConnect(socket))
    }

    onConnect(socket) {
        console.log("User connected to socket")
        socket.on('create_room', (cb) => {
            const newId = Utils.NewId();
            console.log("Creating room", newId)
            this.roomsDb.findOne({_id: newId}, (err, doc) => {
                if (!!err || doc != null) {
                    cb({
                        id: null,
                        error: err,
                    })
                    console.log("Db error", err, "Document", doc)
                    return;
                }

                this.roomsDb.insert({_id: newId})
                cb({
                    id: newId,
                    error: undefined,
                })
            })
        })

        socket.on('check_room', (roomId, cb) => {
            this.roomsDb.findOne({_id: roomId}, (err, doc) => {
                if (!!err || doc === null) {
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
            this.roomsDb.findOne({_id: roomId}, (err, doc) => {
                if (!!err || doc == null) {
                    cb({
                        success: false,
                        error: err
                    })
                    return;
                }
                let occupancy = this.io.sockets.adapter.rooms.get(roomId) === undefined ? 0 : this.io.sockets.adapter.rooms.get(roomId).size
                console.log("occupancy", occupancy)
                if (occupancy >= 2) {
                    cb({
                        success: false,
                        err: new Error("Room is full")
                    })
                } else {
                    socket.join(roomId)
                    if (occupancy === 2){
                        this.io.to(roomId).emit("start_game")
                    }
                    cb({
                        success: true,
                        err: undefined
                    })
                }
            })
        })

        socket.on('emote', (emoteId) => {
            socket.emit('emote', emoteId)
        })




    }


}

module.exports = Socket
