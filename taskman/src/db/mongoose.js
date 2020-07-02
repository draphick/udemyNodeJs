const mongoose = require('mongoose')
// const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
const connectionURL = 'mongodb://discordbot:discordbot@192.168.1.162:18902/discordbot'
const validator = require('validator')

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
    // useFindAndModify: false
})

// const Task = mongoose.model('Tasks', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         required: false,
//         default: false
//     }
// })

// const newTask = new Task({
//     description: '    Grab a brush    '
//     // completed: false
// })

// newTask.save().then(() =>{
//     console.log(newTask)
// }).catch((error) => {
//     console.log('Error: ', error)
// })

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     age: {
//         type: Number,
//         validate(value){
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         },
//         default: 0
//     },
//     email: {
//         type: String,
//         required: true,
//         validate(value){
//             if (!validator.isEmail(value)){
//                 throw new Error('Email is invalid.')
//             }
//         },
//         trim: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         minlength: 7,
//         validate(value){
//             if (validator.contains(value.toLowerCase(), 'password')){
//                 throw new Error('Password must not contain "password".')
//             }
//         },
//         trim: true,
//         required: true
//     }
// })

// const me = new User({
//     name: '   Raph2    ',
//     age: 34,
//     email: '  raph@ODRALLAG.com   ',
//     password: 'asdfsds'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error: ', error)
// })