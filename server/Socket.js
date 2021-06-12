const {Server} = require('socket.io')
const Database = require('./Database')
const Utils = require('./Utils')
const QuizApi = require("./QuizApi");
const {uniqueNamesGenerator, adjectives, colors, starWars} = require('unique-names-generator');

class Socket {
    io;
    roomsDb;
    rooms = {}

    constructor(server) {
        this.roomsDb = Database.GetDatabase("rooms")
        this.highScoreDb = Database.GetDatabase("highScore")
        console.log(this.roomsDb)
        this.io = new Server(server)
        this.io.on('connection', (socket) => this.onConnect(socket))
    }

    onConnect(socket) {
        socket.score = 0;
        socket.nick = uniqueNamesGenerator({dictionaries: [adjectives, colors, starWars]});
        socket.lives = 3;
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
                        err: undefined,
                        nick: socket.nick,
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

        socket.on('answer', async (answer) => {
            let room = this.rooms[socket.gameRoom];
            let now = Date.now();
            if (answer === room.lastQuestion.correctAnswer) {
                let pts = room.lastQuestion.CalculateResult(now);
                socket.points += pts;
                this.io.to(socket.gameRoom).emit('set_score', socket.id, socket.score);
            } else {
                socket.lives -= 1;
                if (socket.lives <= 0) {
                    this.io.emit('end_game', socket.id);
                    this.highScoreDb.insert({
                        nick:room.currentPlayer.nick,
                        score: room.currentPlayer.score,
                    });
                    this.highScoreDb.insert({
                        nick:room.nextPlayer.nick,
                        score: room.nextPlayer.score,
                    });
                }
                socket.to(socket.gameRoom).emit('lives', socket.id, socket.lives);
            }
            room.numberOfAnswers += 1;
            if (room.numberOfAnswers >= 2) {
                await this.NextQuestion(socket.gameRoom);
            }
        })

        socket.on('emote', (emoteId) => {
            socket.to(socket.gameRoom).emit('emote', emoteId)
        })

        socket.on('disconnect', () => {
            socket.to(socket.gameRoom).emit('player_disconnected')
        })

        socket.on('nick', (nick) => {
            socket.nick = nick;
            socket.to(socket.gameRoom).emit('nick', nick);
        })
    }

    async NextQuestion(roomId) {
        let room = this.rooms[roomId];
        room.numberOfAnswers = 0;
        const question = await QuizApi.GetRandomQuestion();
        room.lastQuestion = question;
        let questionCopy = JSON.parse(JSON.stringify(question));
        questionCopy.correctAnswer = undefined;
        question.StampTime();
        this.io.to(roomId).emit("next_question", questionCopy)
    }


}

module.exports = Socket
