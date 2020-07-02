// const square = function (number) {
//     return number * number
// }

// console.log(square(8))

// const square = (number) =>  number * number

// console.log(square(8))

const event = {
    name: 'Poop Party',
    guestList: ['Raph', 'Jerm', 'Balls'],
    printGuestList()  {
        console.log('Guest List For: ' + this.name)

        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

event.printGuestList()