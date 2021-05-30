import './style.css';


import Main from './components/Main';

function init() {
    const container = document.getElementById('root');
    new Main(container);
}

class Entry {
    constructor() {
        this.roomIDInput = document.getElementById('roomIDInput');
        this.joinRoomWithIDBtn = document.getElementById('joinRoomWithIDBtn');
        this.joinRoomBtn = document.getElementById('joinRoomBtn');

        this.joinRoomBtn.onclick = () => {
            // JOIN TO FREE ROOM
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




init();