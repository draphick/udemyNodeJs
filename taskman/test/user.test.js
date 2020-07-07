const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'jerm',
    email: 'testjerm@example.com',
    password: '56what!!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

afterEach(() => {
    console.log('after each')
})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Raph',
        email: 'testcase.raph@example.com',
        password: 'passTest777!'
    }).expect(201)
})

test('login success user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('login failure user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'asdf'
    }).expect(400)
})
