const socket = io()

socket.on('message', (text) => {
    console.log(text)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const chatMessage = e.target.elements.message.value
    socket.emit('sendMessage', chatMessage)
})