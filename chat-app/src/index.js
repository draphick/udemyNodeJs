const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const { 
    generateMessage, 
    generateLocationMessage 
} = require('./utils/messages')

const {
    addUser,
    removeUser,
    getUsersInRoom,
    getUser
} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New websocket connection, perfect.')

    socket.on('join', ({ username, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room})
        
        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} is alive!!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()

        // Everything messages:
        // socket.emit - message to everyone
        // io.emit
        // socket.broadcast.emit - message to everyone except sender

        // Room only messages:
        // io.to().emit - message to everyone in specific room
        // socket.broadcast.to().emit - message to everyone except sender in specific room
    })

    socket.on('sendMessage', (chatMessage, callback) => {
        const user = getUser(socket.id)

        const filter = new Filter()

        if (filter.isProfane(chatMessage)){
            return callback('Bad word found')
        }
        io.to(user.room).emit('message', generateMessage(user.username, chatMessage))
        callback()
    })

    socket.on('sendLocation', (position, callback) => {
        const user = getUser(socket.id)
        
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `http://google.com/maps?q=${position.lat},${position.long}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} is dead!!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    
    })
})

server.listen(port, () => {
    console.log('Server is up on port: ', port)
})