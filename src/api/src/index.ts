import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const main = async () => {
  const app = express();

  app.use(compression());
  app.set('trust-proxy', 1);

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
    }),
  );

  app.use(express.json());
};

main().catch(e => console.error(e));
