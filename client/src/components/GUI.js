export default class GUI {
    constructor(roomID, player, connectionManager) {
        this.player = player;
        this.connectionManager = connectionManager;
        this.roomID = roomID;
        this.roomIDSpan = document.getElementById('roomID');


        this.roomIDSpan.textContent = this.roomID;

        this.emotsDiv = document.createElement('div')
        this.emotsDiv.classList.add('emots')

        // // INIT PANEL
        this.panel = document.createElement('div');
        this.panel.classList.add('player-panel');


        this.playerLivesSpan = document.createElement('span');
        this.playerLivesSpan.textContent = "3";
        this.playerLivesSpan.classList.add('livesSpan');
        this.playerLivesSpan.id = "playerLivesSpan"

        this.enemyLivesSpan = document.createElement('span');
        this.enemyLivesSpan.textContent = "3";
        this.enemyLivesSpan.classList.add('livesSpan');
        this.enemyLivesSpan.id = "enemyLivesSpan"

        document.body.appendChild(this.playerLivesSpan)
        document.body.appendChild(this.enemyLivesSpan)


        this.panel.id = "playerPanel"
        this.panel.classList.add('player-panel-left');
        this.emotsDiv.classList.add('emots-left')
        // if (this.player.isPlayerLeft) this.panel.classList.add('player-panel-left');
        // else this.panel.classList.add('player-panel-right');

        // if (this.player.isPlayerLeft) this.emotsDiv.classList.add('emots-left')
        // else this.emotsDiv.classList.add('emots-right')

        const emots = ['crstand', 'salute', 'flip', 'wave']

        emots.forEach(emotName => {
            const emotSpan = document.createElement('span');
            emotSpan.textContent = emotName;
            emotSpan.classList.add('emot');
            emotSpan.onclick = () => {
                this.player.animation.playAnim(emotName);
                this.connectionManager.emote(emotName);
            }
            this.emotsDiv.append(emotSpan);
        })



        document.body.append(this.emotsDiv)
    }

    showQuestion(question) {
        console.log('SHOW QUESITON')
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('questionDiv')
        const questionSpan = document.createElement('span');
        questionSpan.textContent = question.question;
        questionDiv.append(questionSpan);
        question.answers.forEach((answer, index) => {
            if (answer) {
                const answerSpan = document.createElement('span');
                answerSpan.textContent = `${index + 1}. ${answer}`;
                answerSpan.classList.add('answerSpan');
                answerSpan.id = `answer${index}`;
                answerSpan.onclick = () => {
                    // SEND QUESITON TO SERVER
                    if (question.answers[question.correctAnswer] === answer) {
                        // GOOD ANSWER
                        console.log('GOOD ANSWER')

                    } else {
                        // WRONG ANSWER
                        console.log('WRONG ANSWER')
                        this.connectionManager.socket.emit('answer', index, (data) => {

                        })
                    }
                    document.body.removeChild(questionDiv);
                }
                questionDiv.append(answerSpan);
            }
        })
        //document.getElementById('playerPanel').appendChild(questionDiv);
        document.body.append(questionDiv);
        //document.querySelector('.player-panel').append(questionDiv);
    }

    setLives(isPlayerLives,lives){
        if(isPlayerLives){
            // DECREMENT PLAYER LIVES
            this.playerLivesSpan.textContent = lives;
        } else {
            // DECREMENT ENEMY LIVES
            this.enemyLivesSpan.textContent = lives;
        }
    }
}