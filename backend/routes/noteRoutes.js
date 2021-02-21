import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import { addNote } from '../controllers/noteController.js';

const router = express.Router();

router.route('/').post(protect, addNote);
