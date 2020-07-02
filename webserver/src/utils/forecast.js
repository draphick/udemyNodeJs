const request = require('request')

const forecast = (data, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9d892fd5e67ea42ddf055597335fafb1&query=' + data.lat + ',' + data.long + '&units=f'
    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.success === false) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                feelslike,
                temperature,
                weather_descriptions
            } = body.current)
        }
    })
}

module.exports = forecast
