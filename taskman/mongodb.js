// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient 
// const ObjectID = mongodb.ObjectID 
// ./mongod --dbpath=/Users/raph/git/mongostuff/mongodb-data/ &

const { MongoClient, ObjectID } = require('mongodb') 
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskman'

const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
/*
{_id: new ObjectID('5eecc244af3b66f0cb34dbdc')},{$set: {completed: false}},
{_id: new ObjectID('5eecc244af3b66f0cb34dbdd')},{$set: {completed: false}},
{_id: new ObjectID('5eecc244af3b66f0cb34dbde')},{$set: {completed: false}}
*/

MongoClient.connect(connectionURL, {  useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Failed connectin')
    }

    const db = client.db(databaseName)


    // db.collection('tasks').deleteOne({
    //     description: 'wake up'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({
    //     age:26
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany(
    //     {completed: 'asdf'},
    //     {$set: {completed: true}}
    // ).then((result) => {
    //     console.log('Success ')
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log('Error')
    //     // console.log(error)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5eecc0d832df37f09d3ade32')
    // }, {
    //     $set: {
    //         name: 'Jerm'
    //     },
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log('result')
    //     console.log(result)
    // }).catch((error) => {
    //     console.log('error')
    //     console.log(error)
    // })

    // db.collection('users').insertOne({
    //     name: 'Jerm',
    //     age: 26,
    //     dob: {
    //         month: 'sept',
    //         day: 26
    //     },
    //     workouts: [
    //         'pullups',
    //         'pushups',
    //         'situps'
    //     ],
    //     _id: id
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Phan',
    //         age: 33
    //     },
    //     {
    //         name: 'Jerm',
    //         age: 31
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Failed inserting users')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'wake up',
    //         completed: false
    //     },
    //     {
    //         description: 'grab a brush and',
    //         completed: false
    //     },
    //     {
    //         description: 'put on a little makeup',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Could not insert the shit')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').findOne({
    //     _id: new ObjectID('5eecc244af3b66f0cb34dbde')
    // }, (error,task) => {
    //     if (error) {
    //         return console.log('unable to fetch')
    //     } else if (!task) {
    //         return console.log('None found')
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: false}).toArray((error,tasks) => {
    //     console.log(tasks)
    // })
})