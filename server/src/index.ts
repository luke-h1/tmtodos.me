import "reflect-metadata";
import "dotenv/config";
import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import cors from "cors";
import { UserResolver } from "./resolvers/user";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "./utils/auth";
import { User } from "./entities/User";
import { Note } from "./entities/Note";
import { noteResolver } from "./resolvers/note";
import { createUserLoader } from "./utils/createUserLoader";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL!,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    synchronize: true,
    entities: [User, Note],
  });

  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(cookieParser());
  app.get("/", (_, res) => {
    res.status(200).json({ msg: "API is running" });
  });

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (e) {
      console.error(e);
      return res.send({ ok: false, accessToken: "" });
    }
    // token is valid & can send back token to client
    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }
    sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, noteResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
      userLoader: createUserLoader(),
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
