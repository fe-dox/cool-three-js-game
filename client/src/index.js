import './style.css';
import ConnectionManager from './components/ConnectionManager';
import Main from './components/Main';

console.log('START')

function init() {
    const container = document.getElementById('root');
    new Main(container);
}

class Entry {
    constructor() {
        this.roomIDInput = document.getElementById('roomIDInput');
        this.joinRoomWithIDBtn = document.getElementById('joinRoomWithIDBtn');
        this.joinRoomBtn = document.getElementById('joinRoomBtn');
        this.connectionManager = new ConnectionManager('localhost', 3000);
        this.joinRoomBtn.onclick = () => {
            console.log('click')
            // CREATE ROOM
            this.connectionManager.socket.emit('create_room',(data) => {
                console.log(data)
            });

            //JOIN ROOM
        }

        this.joinRoomWithIDBtn.onclick = () => {
            const ID = roomIDInput.value;
            if (ID.length === 8) {
                // CHECK IF ROOM ID IS VALID
                const isIDValid = true; // mocked id validation
                if (isIDValid) {
                    init();
                    this.hideEntry();
                }
                else alert('ID is not valid!');
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