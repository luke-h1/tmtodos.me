import 'reflect-metadata';
import session from 'express-session';
import 'dotenv-safe/config';
import connectRedis from 'connect-redis';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { graphqlUploadExpress } from 'graphql-upload';
import { User } from './entities/User';
import { Todo } from './entities/Todo';
import { createUserLoader } from './utils/createUserLoader';
import { COOKIE_NAME, __prod__ } from './shared/constants';
import { createSchema } from './shared/createSchema';
import { redis } from './shared/redis';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: !__prod__,
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: !__prod__,
    entities: [User, Todo],
  });
  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  app.set('trust proxy', 1); // Let Express know about nginx proxies
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN!,
      credentials: true,
    }),
  );

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? '.tmtodos.me' : undefined, // SSR issues with forwarding cookies
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    }),
  );

  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 15, // limit each IP to 15 requests per windowMs
    message: 'Too many health check requests',
  });

  app.get('/api/health', limiter, (_, res) => {
    res.status(200).json({ status: 'ok' });
  });

  const apolloServer = new ApolloServer({
    playground: process.env.NODE_ENV !== 'production',
    uploads: false,
    schema: await createSchema(),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(), // batches SQL requests for users
    }),
  });
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT} 🚀`);
  });
};
main().catch((e) => {
  console.error(e);
});
