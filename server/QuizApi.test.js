const quizApi = require("./QuizApi");

(async function (){
    const question = await quizApi.GetRandomQuestion();
    console.log(question)
})()
