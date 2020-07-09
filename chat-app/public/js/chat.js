const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')

socket.on('message', (text) => {
    console.log(text)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const chatMessage = e.target.elements.message.value
    socket.emit('sendMessage', chatMessage, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error){
            return console.log(error)
        }
        console.log(callbackFromServer)
    })
})

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    $locationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude
        long = position.coords.longitude
        socket.emit('sendLocation', {lat, long}, () => {
            $locationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })

    })
})