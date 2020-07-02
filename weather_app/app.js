const request = require('request')
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const search = process.argv[2]

geocode(search, (error, { lat, long, location } = {}) => {
    if (!search) {
        console.log('Your dumbass forgot to tell me what to search!')
    } else {
        if (error) {
            return console.log(error)
        }
        forecast({ lat, long, location }, (error, foredata) => {
            if (error) {
                return console.log(error)
            } else{
                const { weather_descriptions, temperature, feelslike } = foredata
                console.log(chalk.inverse.green("Found: " + location + "\nIt is currently " + weather_descriptions + " and " + temperature + " degrees, but it feels like " + feelslike + " degrees out."))
            }     
        })
    }
})

