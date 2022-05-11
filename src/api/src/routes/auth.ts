import dotenv from 'dotenv';
import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

router.post(
  '/register',
  body('firstName').isString().withMessage('firstName is a required field'),
  body('lastName').isString().withMessage('lastName is a required field'),
  body('email').isEmail().withMessage('email is a required field'),
  body('password')
    .isLength({ min: 6, max: 70 })
    .withMessage('password must be between 6 and 70 characters'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists' }], data: null });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const token = await jwt.sign({ user: newUser }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      errors: null,
      data: {
        token,
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
      },
    });
  },
);
export default router;
