import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// testing
dotenv.config();

connectDB();

const app = express();
app.set('trust proxy', 1);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.use(morgan('dev'));

app.use('/api/users', userRoutes);

app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold,
  ),
);
