export default class GUI{
    constructor(roomID){
        console.log('GUI ROOM ID',roomID)
        this.roomID = roomID;
        this.roomIDSpan = document.getElementById('roomID');
        this.roomIDSpan.textContent = this.roomID;
    }
}