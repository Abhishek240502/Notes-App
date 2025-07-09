// --- routes/notes.js ---
const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

router.post('/', async (req, res) => {
  const note = await Note.create({ text: req.body.text, userId: req.user.id });
  res.json(note);
});

router.delete('/:id', async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Deleted' });
});

module.exports = router;