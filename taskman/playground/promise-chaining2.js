require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5eef9a80cda46f186219586e').then(() => {
//     return Task.countDocuments()
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5eefa5114bfd0b1ac21241be').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})