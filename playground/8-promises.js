// Normal Promise
// const doWorkPromise = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         // resolve('yes')
//         reject('No')
//     }, 2000)
// })

// doWorkPromise.then((result) => {
//     console.log('Success', result)
// }).catch((error) => {
//     console.log('Error', error)
// })

// Promise chaining
const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

add(1,2).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})

