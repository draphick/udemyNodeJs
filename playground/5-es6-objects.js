const name = 'Raph'
const userAge = 33

const user = {
    name,
    age: userAge,
    location: 'Seattle'
}

const product = {
    label: 'red notebook',
    price: 3,
    stock: 201,
    salesPrice: undefined
}

// const {label, stock} = product
// console.log(label)

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock) 
}

transaction('order', product)