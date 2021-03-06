import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import {
  addNote, getNoteById, updateNote, deleteNote, getAllNotes,
} from '../controllers/noteController.js';

const router = express.Router();

router.route('/').post(protect, addNote);

router.route('/:id').get(protect, getNoteById).put(updateNote).delete(protect, deleteNote);

router.route('/me/:id').get(protect, getAllNotes);

export default router;
