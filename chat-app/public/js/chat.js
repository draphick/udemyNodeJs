const socket = io()

socket.on('message', (text) => {
    console.log(text)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const chatMessage = e.target.elements.message.value
    socket.emit('sendMessage', chatMessage)
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude
        long = position.coords.longitude
        socket.emit('sendLocation', {lat, long})

    })
})