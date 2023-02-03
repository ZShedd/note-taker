const express = require('express');
const path = require('path');
const html = require('./Routes/index.js');
const api = require('./Routes/notes.js')
const noteData = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();



//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', html);
app.use('/api', api);

app.use(express.static('pages'));

// GET Route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './pages/notes.html'))
);

// GET route for API
app.get('/api/notes', (req, res) => res.json(noteData));

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './pages/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);