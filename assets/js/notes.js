const noteRoute = require('express').Router();
const storeJS = require('./store.js');

noteRoute.get('/notes', (req, res) => {
  storeJS
  .getEveryNote().then((data) => res.json(data));
});

// POST Route for a new UX/UI note
noteRoute.post('/notes', (req, res) => {
  storeJS
  .addNewNote(req.body).then((note) => res.json(note))
  .catch((err) => res.status(500).json(err));
});

noteRoute.delete('/notes/:id', (req, res) => {
  storeJS
  .removeNoteId(req.params.id).then(() => res.json({ok: true}))
  .catch((err) => res.status(500).json(err));
})

module.exports = noteRoute;