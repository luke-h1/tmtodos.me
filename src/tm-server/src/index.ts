import 'reflect-metadata';
import session from 'express-session';
import 'dotenv-safe/config';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { UserResolver } from './resolvers/user';
import { User } from './entities/User';
import { Todo } from './entities/Todo';
import { todoResolver } from './resolvers/todo';
import { createUserLoader } from './utils/createUserLoader';
import { COOKIE_NAME, __prod__ } from './constants';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: !__prod__,
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: !__prod__,
    entities: [User, Todo],
  });
  // await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL!);
  app.set('trust proxy', 1); // Let Express know about nginx proxies
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN!,
      credentials: true,
    }),
  );

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

  const apolloServer = new ApolloServer({
    playground: process.env.NODE_ENV !== 'production',
    schema: await buildSchema({
      resolvers: [UserResolver, todoResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(), // batches SQL requests for users
    }),
  });
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(process.env.PORT!, () => {
    console.log(`Server running on http://localhost:${process.env.PORT} 🚀`);
  });
};
main().catch((e) => {
  console.error(e);
});
