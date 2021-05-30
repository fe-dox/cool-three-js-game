import { io } from "socket.io-client";


export default class ConnectionManager {
    constructor(serverUrl,PORT) {
        this.serverUrl = serverUrl;
        this.socket = io(`http://${this.serverUrl}:${PORT}`);

        this.socket.on("connect", this.onConnect);
        this.socket.on("disconnect", this.onDisconnect);
        this.socket.on("connection", this.onConnection);
    }

    onConnect() {
        console.log(`Connected! Socket id: ${this.socket.id}`);
    }

    onDisconnect() {
        console.log('Disconnected!');
    }

    onConnection() {

    }

    joinRoom(){
        this.socket.emit('join_room');
    }
}