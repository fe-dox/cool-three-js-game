export default class GUI {
    constructor(roomID, player,playerAnimation,connectionManager) {
        this.player = player;
        this.connectionManager = connectionManager;
        this.playerAnimation = playerAnimation;
        // this.isPlayerLeft = isPlayerLeft;
        this.roomID = roomID;
        this.roomIDSpan = document.getElementById('roomID');


        this.roomIDSpan.textContent = this.roomID;

        this.emotessDiv = document.createElement('div')
        this.emotessDiv.classList.add('emotess')
        if (this.player.isPlayerLeft) this.emotessDiv.classList.add('emotess-left')
        else this.emotessDiv.classList.add('emotess-right')
        const emotess = ['salute', 'flip', 'wave']


        emotess.forEach(emotes => {
            const emotesSpan = document.createElement('span');
            emotesSpan.textContent = emotes;
            emotesSpan.classList.add('emotes');
            emotesSpan.onclick = () => {
                this.playerAnimation.playAnim(emotes);
                this.connectionManager.emotese(emotes)
                    .then(data => {
                        console.log(data)
                    })
            }
            this.emotessDiv.append(emotesSpan);
        })

        document.body.append(this.emotessDiv)
    }
}