import 'reflect-metadata';
import session from 'express-session';
import 'dotenv-safe/config';
import connectRedis from 'connect-redis';
import express from 'express';
import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload';
import compression from 'compression';
import { createUserLoader } from './utils/createUserLoader';
import { COOKIE_NAME, isProd } from './shared/constants';
import { createSchema } from './shared/createSchema';
import { redis } from './shared/redis';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: [join(__dirname, './migrations/*')],
    entities: [join(__dirname, './entities/*')],
    synchronize: true,
  });
  // await conn.runMigrations();
  const app = express();
  app.use(compression());

  const RedisStore = connectRedis(session);
  app.set('trust proxy', 1);
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
        secure: isProd,
        domain: isProd ? '.tmtodos.me' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    // playground: process.env.NODE_ENV !== 'production',
    // uploads: false,
    schema: await createSchema(),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(), // batches SQL requests for users
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT} 🚀`);
  });
};
main().catch((e) => {
  console.error(e);
});
