/* eslint-disable radix */
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";
import { Note } from "../entities/Note";
import { isAuth } from "../utils/isAuth";
import { MyContext } from "src/types";

@InputType()
class NoteInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@Resolver()
export class noteResolver {
  @Query(() => [Note])
  async notes(
    @Arg("limit") limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<Note[]> {
    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Note)
      .createQueryBuilder("n")
      .orderBy('"createdAt"')
      .take(realLimit);
    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }
    return qb.getMany();
  }

  @Query(() => Note, { nullable: true })
  note(@Arg("id", () => Int) id: number): Promise<Note | undefined> {
    return Note.findOne(id);
  }

  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async createNote(
    @Arg("title") title: string,
    @Arg("text") text: string,

    @Ctx() { req }: MyContext
  ): Promise<Note> {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("not authenticated");
    }
    const token = authorization.split(" ")[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return Note.create({
      title, text,
      creatorId: payload.userId,
    }).save();
  }

  @Mutation(() => Note, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Note | null> {
    const note = await Note.findOne(id);
    if (!note) {
      return null;
    }
    if (typeof title !== "undefined") {
      note.title = title;
      await Note.update({ id }, { title });
    }
    return note;
  }

  @Mutation(() => Boolean)
  async deleteNote(@Arg("id") id: number): Promise<boolean> {
    await Note.delete(id);
    return true;
  }
}
