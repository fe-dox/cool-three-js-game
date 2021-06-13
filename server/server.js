const http = require('http');
const express = require('express')
const Socket = require('./Socket');
const helmet = require('helmet')
const path = require("path");
const Database = require('./Database');

const app = express()
const port = 3000

const server = http.createServer(app)
const sockets = new Socket(server)

app.use(helmet())
// if (process.env.ENVIRONMENT === "production") {
//     app.use(express.static(path.join(__dirname, 'public')))
// } else {
//     app.use(express.static(path.join(__dirname, '../client/dist')))
// }
app.use(express.static(path.join(__dirname, 'public')))
app.get("/highScores", (req, res) => {
    const highScoreDb = Database.GetDatabase("highScore")
    highScoreDb.find({}).sort({score: 1}).limit(100).exec((err, docs) => {
        if (!!err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(docs)
    });
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
