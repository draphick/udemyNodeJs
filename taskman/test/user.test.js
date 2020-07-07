const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'jerm',
    email: 'testjerm@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWTSECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

// afterEach(() => {
//     console.log('after each')
// })

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Raph',
        email: 'testcase.raph@example.com',
        password: 'passTest777!'
    }).expect(201)
})

test('login success', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('login failure', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'asdf'
    }).expect(400)
})

test('get user profile success', async () => {
    await request(app)
        .get('/users/me')
        .set('authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('get user profile failure', async () => {
    await request(app)
        .get('/users/me')
        .set('authorization',`Bearer badauthtoken`)
        .send()
        .expect(401)
})

test('delete account success', async () => {
    await request(app)
        .delete('/users/me')
        .set('authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('delete account failure', async () => {
    await request(app)
        .delete('/users/me')
        .set('authorization',`Bearer badauthtoken`)
        .send()
        .expect(401)
})