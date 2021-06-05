const {Server} = require('socket.io')
const Database = require('./Database')
const Utils = require('./Utils')
const QuizApi = require("./QuizApi");

class Socket {
    io;
    roomsDb;
    rooms = {}

    constructor(server) {
        this.roomsDb = Database.GetDatabase("rooms")
        console.log(this.roomsDb)
        this.io = new Server(server)
        this.io.on('connection', (socket) => this.onConnect(socket))
    }

    onConnect(socket) {
        socket.on('create_room', (cb) => {
            const newId = Utils.NewId();
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
                this.rooms[newId] = {}
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

        socket.on('join_room', async (roomId, cb) => {
            this.roomsDb.findOne({_id: roomId}, (err, doc) => {
                if (!!err || doc == null) {
                    cb({
                        success: false,
                        error: err
                    })
                    return;
                }
                let occupancy = this.io.sockets.adapter.rooms.get(roomId) === undefined ? 0 : this.io.sockets.adapter.rooms.get(roomId).size
                if (occupancy >= 2) {
                    cb({
                        success: false,
                        err: new Error("Room is full")
                    })
                } else {
                    socket.gameRoom = roomId;
                    socket.join(roomId)
                    cb({
                        numberOfPlayers: occupancy + 1,
                        success: true,
                        err: undefined
                    })
                    if (occupancy === 1) {
                        this.rooms[socket.gameRoom].currentPlayer = socket;
                        this.NextQuestion(roomId);
                    }
                    if (occupancy === 0) {
                        this.rooms[roomId].nextPlayer = socket;
                    }
                }
            })
        })

        socket.on('answer', (answer) => {

        })

        socket.on('emote', (emoteId) => {
            socket.to(socket.gameRoom).emit('emote', emoteId)
        })

        socket.on('disconnect', () => {
            socket.to(socket.gameRoom).emit('player_disconnected')
        })
    }

    async NextQuestion(roomId) {
        let socket = this.rooms[roomId].nextPlayer;
        this.rooms[roomId].nextPlayer = this.rooms[roomId].currentPlayer;
        this.rooms[roomId].currentPlayer = socket;
        const question = await QuizApi.GetRandomQuestion();
        question.StampTime();
        socket.lastQuestion = question;
        this.io.to(socket.gameRoom).emit("next_question", socket.id, question)
    }


}

module.exports = Socket
