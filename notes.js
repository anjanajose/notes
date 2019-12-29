const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => console.log(JSON.stringify(loadNotes())) 

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.red.underline('Your Notes'))
    notes.forEach((note) => console.log(chalk.green(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const matchingNote = notes.find((note) => note.title === title)
    if(matchingNote) {
        console.log(chalk.red.underline(matchingNote.title))
        console.log(chalk.green(matchingNote.body))
    } else {
        console.log(chalk.bgRed('Note with title '+title+' not found'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote =
        notes.find((note) => note.title === title)
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes) 
        console.log(chalk.bgGreen('New note saved'))
    } else {
        console.log(chalk.bgRed('Note title is duplicate'))
    }  
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = 
        notes.filter((note) => note.title !== title) 
    if(notes.length == newNotes.length) {
        console.log(chalk.bgRed('No note found'))
    } else {
        saveNotes(newNotes)
        console.log(chalk.bgGreen('Note removed'))
    }
}

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes))

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson  = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
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