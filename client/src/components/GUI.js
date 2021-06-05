export default class GUI {
    constructor(roomID, player, connectionManager) {
        this.player = player;
        this.connectionManager = connectionManager;
        // this.isPlayerLeft = isPlayerLeft;
        this.roomID = roomID;
        this.roomIDSpan = document.getElementById('roomID');


        this.roomIDSpan.textContent = this.roomID;

        this.emotsDiv = document.createElement('div')
        this.emotsDiv.classList.add('emots')
        if (this.player.isPlayerLeft) this.emotsDiv.classList.add('emots-left')
        else this.emotsDiv.classList.add('emots-right')
        const emots = ['salute', 'flip', 'wave']


        emots.forEach(emotName => {
            const emotSpan = document.createElement('span');
            emotSpan.textContent = emotName;
            emotSpan.classList.add('emot');
            emotSpan.onclick = () => {
                this.player.animation.playAnim(emotName);
                this.connectionManager.emote(emotName)
                    .then(data => {
                        console.log(data)
                    })
            }
            this.emotsDiv.append(emotSpan);
        })

        document.body.append(this.emotsDiv)
    }
}