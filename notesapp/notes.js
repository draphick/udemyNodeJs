const chalk = require('chalk')
const fs = require('fs')
const getNotes = () => {
    return "All the notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added."))
    } else {
        console.log(chalk.red.inverse("Note already exists"))
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    saveNotes(notesToKeep)

    if (notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note removed', title))
    } else {
        console.log(chalk.red.inverse('No note found with name:', title))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    note = notes.find((note) => note.title === title)
    if (!note) {
        console.log(chalk.red('NO NOTE FOUND'))
    } else {
        console.log(chalk.yellow(note.title))
        console.log(chalk.blue(note.body))
    }
}

const listNotes = () => {
    console.log(chalk.green('Your notes:'))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(chalk.red.inverse(note.title))
    })
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const databuffer = fs.readFileSync('notes.json')
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}