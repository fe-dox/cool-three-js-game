const http = require('http');
const express = require('express')
const {Server} = require('socket.io')
const helmet = require('helmet')
const path = require("path");

const app = express()
const port = 3000

const server = http.createServer(app)



app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))


server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
