import { io } from "socket.io-client";


export default class ConnectionManager {
    constructor(serverUrl, PORT, enemy) {
        this.player = undefined;
        this.enemy = undefined;
        this.gui = undefined;
        this.serverUrl = serverUrl;
        this.socket = io(`http://${this.serverUrl}:${PORT}`);

        this.socket.on("connect", () => this.onConnect());
        this.socket.on("disconnect", () => this.onDisconnect());
        this.socket.on("connection", () => this.onConnection());
        this.socket.on("next_question", (socketID, question) => {
            console.log(socketID, this.socket.id);
            console.log(question)
            this.gui.showQuestion(question);
        });
        this.socket.on("emote", emoteName => this.playEnemyEmote(emoteName));
    }

    async onConnect() {
        console.log(`Connected! Socket id: ${this.socket}`);
        return this.socket;
    }

    createRoom() {
        return new Promise((res, rej) => {
            this.socket.emit('create_room', (data) => {
                res(data);
            });
        })
    }

    joinRoom(roomID) {
        return new Promise((res, rej) => {
            this.socket.emit('join_room', roomID, (data) => {
                res(data);
            });
        })
    }

    checkRoom(roomID) {
        return new Promise((res, rej) => {
            this.socket.emit('check_room', roomID, (data) => {
                res(data);
            });
        })
    }

    onDisconnect() {
        console.log('Disconnected!');
    }

    emote(emoteName) {
        this.socket.emit('emote', emoteName);
    }

    playEnemyEmote(emoteName) {
        this.enemy.animation.playAnim(emoteName);
    }
}