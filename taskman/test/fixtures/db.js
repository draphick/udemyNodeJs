const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'jerm',
    email: 'testjerm1@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWTSECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Phan',
    email: 'Phan@example.com',
    password: 'thisPhan!!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWTSECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOne,
    userOneId,
    setupDatabase,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree
}