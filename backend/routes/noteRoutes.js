import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import { addNote, getNoteById } from '../controllers/noteController.js';

const router = express.Router();

router.route('/').post(protect, addNote);

router.route('/:id').get(protect, getNoteById);

export default router;
