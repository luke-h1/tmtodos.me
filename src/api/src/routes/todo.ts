/* eslint-disable no-shadow */
import dotenv from 'dotenv';
import express from 'express';
import { body, validationResult, buildCheckFunction } from 'express-validator';
import prisma from '../database/prisma';
import { checkAuth } from '../middleware/checkAuth';

const checkParams = buildCheckFunction(['params']);

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await prisma.user.findFirst({ where: { email: req.user } });

  const todos = await prisma.todo.findMany({
    where: {
      userId: user?.id,
    },
  });

  return res.status(200).json({
    errors: null,
    data: {
      todos,
    },
  });
});

router.post(
  '/',
  body('title').isString().withMessage('title is a required field'),
  body('body').isString().withMessage('body is a required field'),
  checkAuth,
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map(error => {
        return {
          message: error.msg,
        };
      });
      return res.status(422).json({ errors });
    }
    const user = await prisma.user.findFirst({ where: { email: req.user } });

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

router.put('/:id', checkParams('id').isInt(), checkAuth, async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(error => {
      return {
        message: error.msg,
      };
    });
    return res.status(422).json({ errors });
  }

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

router.get('/:id', checkParams('id').isInt(), async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(error => {
      return {
        message: error.msg,
      };
    });
    return res.status(422).json({ errors });
  }

  const user = await prisma.user.findFirst({ where: { email: req.user } });

  const todo = await prisma.todo.findFirst({
    where: { id: parseInt(req?.params?.id, 10), userId: user?.id },
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

router.delete('/:id', checkParams('id').isInt(), async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(error => {
      return {
        message: error.msg,
      };
    });
    return res.status(422).json({ errors });
  }

  const user = await prisma.user.findFirst({ where: { email: req.user } });

  const todo = await prisma.todo.findFirst({
    where: { id: parseInt(req?.params?.id, 10), userId: user?.id },
  });

  if (!todo) {
    return res
      .status(404)
      .json({ errors: [{ msg: 'Todo not found' }], data: null });
  }

  await prisma.todo.delete({
    where: {
      id: parseInt(req?.params?.id, 10),
    },
  });

  return res.status(204).json({
    errors: null,
    data: null,
  });
});

export default router;
