require('../src/db/mongoose')
const User = require('../src/models/user')

// 5eefa04c781c55197d414557

// User.findByIdAndUpdate('5eefa3d981e7ea1aa3ae8ef4', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5eefa04c781c55197d414557', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})