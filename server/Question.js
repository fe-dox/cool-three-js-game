class Question {
    question = "";
    answers = [];
    correctAnswer = 0
    category = ""
    timeStamp = 0;
    questionTarget = ""

    constructor(question, answers, correctAnswer, category) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.category = category;
    }

    StampTime() {
        this.timeStamp = Date.now();
    }
}

module.exports = Question
