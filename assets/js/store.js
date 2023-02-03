const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class StoredNotes {
    read() {
        return readFile('./db/db.json', 'utf8');
    }
    write(data) {
        return writeFile('./db/db.json', JSON.stringify(data));
    }

 getAllNotes() {
        return this.read().then((notes) => {

            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    };

addNewNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error('Please add a title and some text to your note.');
        }

        const nextNote = {
            title,
            text,
            id: uuidv4(),
        };
        
        return this.getAllNotes()
        .then((notes) => [...notes, nextNote])
        .then((savedNotes) => this.write(savedNotes))
        .then(() => nextNote);
    }

    removeNoteId(id) {
        return this.getAllNotes()
        .then((notes) => notes.filter((note) => note.id!== id))
        .then((justNotes) => this.write(justNotes))
    }
}

module.exports = new StoredNotes();