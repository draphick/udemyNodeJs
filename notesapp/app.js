const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version("1.1.0")

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    builder:{
        body: {
            describe: "Body of note",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const note = notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title:{
            describe: "Remove a title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const note = notes.removeNote(argv.title)
    },
})

yargs.command({
    command: 'list',
    describe: 'List all your notes',
    handler() {
        notes.listNotes()
    },
})

yargs.command({
    command: 'read',
    describe: 'Read a specific note',
    builder: {
        title: {
            describe: "Read a specific note",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    },
})

yargs.parse()