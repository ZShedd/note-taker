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