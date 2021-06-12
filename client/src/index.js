import './style.css';
import ConnectionManager from './components/ConnectionManager';
import Main from './components/Main';

document.body.onload = () => document.getElementById('loading').style.display = "none";

function hide() {
    document.getElementById('main').style.display = "none";
}

function init(connectionManager, roomID, numberOfPlayers) {
    const container = document.getElementById('root');
    new Main(container, connectionManager, roomID, numberOfPlayers);
    hide();
}

class Entry {
    constructor() {
        this.roomIDInput = document.getElementById('roomIDInput');
        this.joinRoomWithIDBtn = document.getElementById('joinRoomWithIDBtn');
        this.joinRoomBtn = document.getElementById('joinRoomBtn');
        this.connectionManager = new ConnectionManager('localhost', 3000);
        
        this.joinRoomBtn.onclick = async () => {
            console.log('click')
            // CREATE ROOM
            let roomID = await this.connectionManager.createRoom();
            roomID = roomID.id;
            console.log('SSS',roomID)
            //JOIN ROOM

            await this.connectionManager.joinRoom(roomID)
                .then(data => {
                    if (data.success) {
                        const numberOfPlayers = data.numberOfPlayers;
                        console.log('NUM OF PLAYERS', numberOfPlayers)
                        init(this.connectionManager, roomID, numberOfPlayers);
                    } else {
                        alert('ID is not valid!');
                    }
                });

        }

        this.joinRoomWithIDBtn.onclick = () => {
            const roomID = roomIDInput.value;
            if (roomID.length === 8) {
                // CHECK IF ROOM ID IS VALID
                //const isIDValid = true; // mocked id validation
                this.connectionManager.joinRoom(roomID)
                    .then(data => {
                        if (data.success) {
                            const numberOfPlayers = data.numberOfPlayers;
                            console.log('NUM OF PLAYERS', numberOfPlayers)
                            init(this.connectionManager, roomID, numberOfPlayers);
                        } else {
                            alert('ID is not valid!');
                        }
                    })


            }
            else {
                alert("ID doesn't match requirements!");
            }
        }

    }




}

const entry = new Entry();