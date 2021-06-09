class Question {
    question = "";
    answers = [];
    correctAnswer = 0
    category = ""
    timeStamp = 0;
    points = 0

    constructor(question, answers, correctAnswer, category, points) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.category = category;
        this.points = points;
    }

    StampTime() {
        this.timeStamp = Date.now();
    }

    CalculateResult(time) {
        time = time / 1000;
        return Math.round(Math.max(25 - time, 0) / 20 * this.points)
    }
}

module.exports = Question
