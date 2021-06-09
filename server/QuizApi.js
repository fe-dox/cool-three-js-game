const bent = require('bent')
const Question = require('./Question')

class QuizApiClient {
    static getJson = bent("json")
    static url = "https://quizapi.io/api/v1/questions?apiKey=quoTe3vjKrjx2TDjd9MXCT6S5z3RFuCqblYV82WH&limit=1"

    static async GetRandomQuestion() {
        const result = (await this.getJson(this.url))[0];
        console.log(result)
        const answers = [];
        let correctAnswer = 0;

        let i = 0;
        for (const answer in result.answers) {
            if (!result.answers.hasOwnProperty(answer)) continue;
            answers.push(result.answers[answer]);
            if (result.correct_answers[answer + "_correct"] === "true") {
                correctAnswer = i;
            }
            i++
        }
        return new Question(result.question, answers, correctAnswer, result.category, QuizApiClient.GetPoints(result.difficulty))
    }

    static GetPoints(difficulty) {
        if (difficulty === "Easy") {
            return 20;
        }
        if (difficulty === "Medium") {
            return 40;
        }
        if (difficulty === "Hard") {
            return 60;
        }
    }

}

module.exports = QuizApiClient
