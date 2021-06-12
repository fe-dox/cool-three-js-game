import { io } from "socket.io-client";
import Alert from './Alert';

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
        this.socket.on("next_question", (question) => {
            this.gui.showQuestion(question);
        });
        this.socket.on("emote", emoteName => this.playEnemyEmote(emoteName));

        this.socket.on("lives", (socketID, lives) => {
            console.log('lives event', socketID, this.socket.id, lives)
            this.gui.setLives(socketID === this.socket.id, lives)
        });

        this.socket.on("set_score", (socketID, score) => {
            // console.log('set_score', socketID, score)
        });

        // this.socket.on("nick", nick => {
        //     console.log('SET ENEMEY NICK',nick)
        //     this.gui.setEnemyNick(nick);
        //  });
        this.socket.on("end_game", loserSoskcetID => {
            if(this.socket.id === loserSoskcetID){
                Alert.showAlert('YOU LOST!')
            } else{
                Alert.showAlert('YOU WON!')
            }
        });
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