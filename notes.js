const fs = require('fs')

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
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
}

const saveNotes = function (notes) {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

module.exports = { 
    getNotes: getNotes,
    addNote: addNote
} 