const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, 
    userOneId, 
    setupDatabase, 
    userTwo, 
    userTwoId, taskOne,
    taskTwo,
    taskThree
 } = require('./fixtures/db')

const { send } = require('@sendgrid/mail')

beforeEach(setupDatabase)
test('task create success',  async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('get all task for user one', async () => {
    const alltasks = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(alltasks.body.length).toBe(2)
})

test('delete task failure (userTwo delete userOne task)', async () => {
    const alltasks = await request(app)
        .delete('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})