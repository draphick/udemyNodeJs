const mongoose = require('mongoose')
const connectionURL = process.env.CONNECTIONURL
const validator = require('validator')

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
