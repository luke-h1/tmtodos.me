import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Note from '../models/noteModel.js';

/*
TODO:
- add custom piece of middlware to make sure the user performing ops on notes is the user who owns the note

- Associate Notes with the user model

*/

// @desc    Create a new Note
// @route   POST /api/notes
// @access  Private
// needs manual testing
// needs jest test

const addNote = asyncHandler(async (req, res) => {
  const { title, body, date } = req.body;
  if (body.length === 0 || title.length === 0) {
    res.status(400);
    throw new Error('Enter a Title');
  } else if (body && body.length === 0) {
    res.status(400);
    throw new Error('Enter a body');
  } else {
    const note = new Note({
      date,
      body,
      user: req.user._id,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});

// @desc    GET note by ID
// @route   GET /api/notes/:id
// @access  Private
// done manual testing
// needs jest test
// need to test if other users can get another users note

const getNoteById = asyncHandler(async (req, res) => {
  const note = await (await Note.findById(req.params.id)).populate('user');
  console.log(note);
  if (note) {
    res.json(note);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    Update Note by ID
// @route   PUT /api/notes/:id
// @access  Private
// done manual testing
// needs jest unit test
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    note.title = req.body.title || note.title;
    note.body = req.body.body || note.body;

    const updatednote = await note.save();
    res.json({
      _id: updatednote._id,
      title: updatednote.title,
      body: updatednote.body,
      user: updatednote.user,
      updatedAt: updateNote.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    delete a single note by ID
// @route   DELETE /api/notes/:id
// @access  Private / Admin only
// done manual testing
// needs jest unit test
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    await note.remove();
    res.status(200).json({ message: 'Note deleted succesfully' });
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

// @desc    get all notes associated with a given user
// @route   GET /api/notes/me/:id
// @access  Private / Admin only
// done manual testing
// needs jest unit test
const getAllNotes = asyncHandler(async (req, res) => {
  const allNotes = await Note.find(req.params._id);
  if (allNotes) {
    res.json(allNotes);
  } else {
    res.status(404);
    throw new Error('note not found');
  }
});

export {
  addNote, getNoteById, updateNote, deleteNote, getAllNotes,
};
