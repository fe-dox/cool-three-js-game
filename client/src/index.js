import './style.css';
import ConnectionManager from './components/ConnectionManager';
import Main from './components/Main';

console.log('START')

function init(hide, connectionManager, roomID) {
    const container = document.getElementById('root');
    new Main(container, connectionManager, roomID);
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

            //JOIN ROOM

            const joinRoomData = await this.connectionManager.joinRoom(roomID);

            if (joinRoomData.success) init(this.hideEntry, this.connectionManager, roomID);
        }

        this.joinRoomWithIDBtn.onclick = () => {
            const roomID = roomIDInput.value;
            if (roomID.length === 8) {
                // CHECK IF ROOM ID IS VALID
                //const isIDValid = true; // mocked id validation
                this.connectionManager.joinRoom(roomID)
                    .then(data => {
                        console.log(data)
                        if (data.success) {
                            init(this.hideEntry, this.connectionManager, roomID);
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



    hideEntry() {
        document.getElementById('main').style.display = "none";
    }
}

const entry = new Entry();


init();