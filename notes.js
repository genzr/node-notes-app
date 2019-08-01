const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes....'
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const notesJSON = dataBuffer.toString()
        const notes = JSON.parse(notesJSON)
        return notes
    } catch (e) {
        return []
    }
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => {
        return note.title === title 
    })

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Duplicate note detected')
    }
}

const saveNotes = function (notes) {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()

    filteredNotes = notes.filter((note) => {
        return note.title !== title 
    })
    saveNotes(filteredNotes)

    if (filteredNotes.length < notes.length) {
        console.log(chalk.black.bgGreen('Note removed successfully!'))
    } else if (filteredNotes.length === notes.length) {
        console.log(chalk.bgRed('No such note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.black.bgCyan('Your Notes:'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    notes = loadNotes()
    foundNote = notes.find((note) => {
        return note.title === title
    })
    if (!foundNote) {
        console.log('Note not found')
    } else {
        console.log(chalk.black.bgWhite(foundNote.title))
        console.log(foundNote.body)
    }
}

module.exports = { 
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
} 