import "reflect-metadata";
import "dotenv/config";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";
import { UserResolver } from "./resolvers/user";
import { User } from "./entities/User";
import { Note } from "./entities/Note";
import { noteResolver } from "./resolvers/note";
import { createUserLoader } from "./utils/createUserLoader";
import { COOKIE_NAME, __prod__ } from "./constants";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL!,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    synchronize: true,
    entities: [User, Note],
  });
  // await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL!);
  app.set("trust proxy", 1); // Let Express know about nginx proxies
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN!,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".takemynotes.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, noteResolver],
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
    console.log(`Server running on http://localhost:${process.env.PORT!} 🚀`);
  });
};
main().catch((e) => {
  console.error(e);
});
