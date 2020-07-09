const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage } = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New websocket connection, perfect.')

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined!'))

    socket.on('sendMessage', (chatMessage, callback) => {
        const filter = new Filter()
        if (filter.isProfane(chatMessage)){
            return callback('Bad word found')
        }
        io.emit('message', generateMessage(chatMessage))
        callback('Delivered!')
    })

    socket.on('disconnect', () => {
        io.emit(generateMessage('A user has left!'))
    })

    socket.on('sendLocation', (position, callback) => {
        socket.emit('locationMessage', generateMessage(`http://google.com/maps?q=${position.lat},${position.long}`))
        callback()
    })
})

server.listen(port, () => {
    console.log('Server is up on port: ', port)
})