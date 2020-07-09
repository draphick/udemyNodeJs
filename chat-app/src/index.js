const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New websocket connection, perfect.')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (chatMessage) => {
        io.emit('message', chatMessage)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left.')
    })

    socket.on('sendLocation', (position) => {
        socket.emit('message', `http://google.com/maps?q=${position.lat},${position.long}`)
    })
})

server.listen(port, () => {
    console.log('Server is up on port: ', port)
})