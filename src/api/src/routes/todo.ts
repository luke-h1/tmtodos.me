/* eslint-disable no-shadow */
import dotenv from 'dotenv';
import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../database/prisma';
import { checkAuth } from '../middleware/checkAuth';

dotenv.config();

const router = express.Router();

router.post(
  '/',
  body('title').isString().withMessage('title is a required field'),
  body('body').isString().withMessage('body is a required field'),
  checkAuth,
  async (req, res) => {
    const user = await prisma.user.findFirst({ where: { email: req.user } });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { title, body, completed } = req.body;

    const newTodo = await prisma.todo.create({
      data: {
        title,
        body,
        completed,
        userId: user?.id,
      },
    });

    return res.status(201).json({
      errors: null,
      data: {
        todo: newTodo,
      },
    });
  },
);

router.put('/:id', checkAuth, async (req, res) => {
  const user = await prisma.user.findFirst({ where: { email: req.user } });

  const todo = await prisma.todo.findFirst({
    where: { id: parseInt(req.params.id, 10), userId: user?.id },
  });

  if (!todo) {
    return res
      .status(404)
      .json({ errors: [{ msg: 'Todo not found' }], data: null });
  }

  const { title, body, completed } = req.body;

  const updatedTodo = await prisma.todo.update({
    where: {
      id: parseInt(req.params.id, 10),
    },
    data: {
      title,
      body,
      completed,
    },
  });

  return res.status(201).json({
    errors: null,
    data: updatedTodo,
  });
});

router.get('/:id', async (req, res) => {
  const user = await prisma.user.findFirst({ where: { email: req.user } });

  const todo = await prisma.todo.findFirst({
    where: { id: parseInt(req.params.id, 10), userId: user?.id },
  });

  if (!todo) {
    return res
      .status(404)
      .json({ errors: [{ msg: 'Todo not found' }], data: null });
  }

  return res.status(200).json({
    errors: null,
    data: todo,
  });
});

router.delete('/:id', async (req, res) => {
  const user = await prisma.user.findFirst({ where: { email: req.user } });

  const todo = await prisma.todo.findFirst({
    where: { id: parseInt(req.params.id, 10), userId: user?.id },
  });

  if (!todo) {
    return res
      .status(404)
      .json({ errors: [{ msg: 'Todo not found' }], data: null });
  }

  await prisma.todo.delete({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });

  return res.status(204).json({
    errors: null,
    data: null,
  });
});

export default router;
