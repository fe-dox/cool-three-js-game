class Question {
    question = "";
    answers = [];
    correctAnswer = 0
    category = ""

    constructor(question, answers, correctAnswer, category) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.category = category;
    }
}

module.exports = Question
