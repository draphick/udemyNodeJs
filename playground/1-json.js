const fs = require('fs')
// const book = {
//     title: 'Big book of dicks',
//     author: 'Raph Gallardo'
// }

// const bookJSON = JSON.stringify(book)

// console.log(bookJSON)
// console.log(JSON.parse(bookJSON).title)

// fs.writeFileSync('1-json.json',bookJSON)

const databuffer = fs.readFileSync('1-json.json')
const dataJSON = databuffer.toString()
const data = JSON.parse(dataJSON)
console.log('old age: ', data.age)
data.age = 11
console.log('new age: ', data.age)

const userJSON = JSON.stringify(data)
fs.writeFileSync('1-JSON.json',userJSON)