import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Note from '../models/noteModel.js';

// @desc    Create a new Note
// @route   POST /api/notes
// @access  Private
// needs manual testing
// needs jest test
// need to test if other users can edit another users note
const addNote = asyncHandler(async (req, res) => {
  const {
    title,
    body,
    date,
  } = req.body;
  if (title && title.length === 0) {
    res.status(400);
    throw new Error('Enter a Title');
  } else if (body && body.length === 0) {
    res.status(400);
    throw new Error('Enter a body');
  } else {
    const note = new Note({
      title,
      date,
      body,
      user: req.user._id,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});

export {
  addNote,
};
