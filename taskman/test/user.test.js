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

beforeEach(async () => { // afterEach(() => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Raph',
        email: 'testcase.raph@example.com',
        password: 'passTest777!'
    }).expect(201)

    // Assert that the db was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertions about the response
    // expect(response.body.user.name).toBe('Raph')
    expect(response.body).toMatchObject({
        user: {
            name: 'Raph',
            email: 'testcase.raph@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('passTest777!')
    
})

test('login success', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
     const user = await User.findById(userOneId)
     expect(user).not.toBeNull()

     expect(response.body).toMatchObject({
         user: {
             name: userOne.name,
             email: userOne.email,
         },
         token: user.tokens[1].token
     })
     expect(user.password).not.toBe(userOne.password)
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

test('delete account failure', async () => {
    await request(app)
        .delete('/users/me')
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
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

