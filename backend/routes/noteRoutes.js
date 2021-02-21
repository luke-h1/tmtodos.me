import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import {
  addNote, getNoteById, updateNote, deleteNote,
} from '../controllers/noteController.js';

const router = express.Router();

router.route('/').post(protect, addNote);

router.route('/:id').get(protect, getNoteById).put(protect, updateNote).delete(protect, deleteNote);

export default router;
