/* eslint-disable import/prefer-default-export */
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running :)' });
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

async (req, res) => {
  try {
    app.listen(PORT, () => {
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.yellow.bold`;
    });
  } catch (e) {
    console.error(e);
  }
};
