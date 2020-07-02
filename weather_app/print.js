const chalk = require('chalk')

// const red = (newcolor, words) => {
//     console.log(chalk`{${newcolor} ${words}}`)
// }

// red('blue', 'asdf')

const red = {
    inverse(phrase) {
        console.log(chalk.red.inverse(phrase))
    },
    bold(phrase) {
        console.log(chalk.red.bold(phrase))
    }
}

const blue = {
    things: ['red', 'green', 'blue'],
    inverse(phrase) {
        console.log(chalk.inverse(phrase))
    },
    bold(phrase) {
        console.log(chalk.blue.bold(phrase))
    }
}



blue.inverse('words')
// red.inverse('asdf')

// blue.bold('asdf1')
// blue.inverse('asdf1')
// const event = {
//     name: 'Poop Party',
//     guestList: ['Raph', 'Jerm', 'Balls'],
//     printGuestList()  {
//         console.log('Guest List For: ' + this.name)

//         this.guestList.forEach((guest) => {
//             console.log(guest + ' is attending ' + this.name)
//         })
//     }
// }

// event.printGuestList()