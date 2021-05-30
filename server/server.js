const http = require('http');
const express = require('express')
const Socket = require('./Socket');
const helmet = require('helmet')
const path = require("path");

const app = express()
const port = 3000

const server = http.createServer(app)
const sockets = new Socket(server)

app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))


server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
