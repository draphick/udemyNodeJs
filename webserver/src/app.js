const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// setup static directory to server
app.use(express.static(path.join(__dirname, '../public')))

// setup handlebars use location
app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        author: 'Raph'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        author: 'Raph',
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        message: 'Need some help?',
        author: 'Raph'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:"Need to provide address"
        })
    }
    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast({ lat, long, location }, (error, foredata) => {
            if (error) {
                return res.send({error})
            } 
            const { weather_descriptions, temperature, feelslike } = foredata
            res.send({
                address: req.query.address,
                location,
                forecast: "It is currently " + weather_descriptions + " and " + temperature + " degrees, but it feels like " + feelslike + " degrees out."
            })  
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:"you must provide a search term"
        })
    } else {
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
})

app.get('/testwrap', (req, res) =>{
    res.render('testwrap', {
        title: 'About Me:',
        author: 'Raph'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Ouch.  Not found.',
        errormessage: 'Help topic not found',
        author: 'Raph'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Ouch.  Not found.',
        errormessage: 'Page not found',
        author: 'Raph'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port 3000')
})