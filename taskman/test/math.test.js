const { add, calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')



test('Get Tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
    // if (total !== 13){
    //     throw new Error('Total tip should be 13. Got: ' + total)
    // }
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Convert F', () => {
    const fval = fahrenheitToCelsius(32)
    expect(fval).toBe(0)
})

test('Convert C', () => {
    const cval = celsiusToFahrenheit(0)
    expect(cval).toBe(32)
})

// test('async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('add test', (done) => {
    add(2,3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers', async () => {
    const sum = await add(3,3)
    expect(sum).toBe(6)
})