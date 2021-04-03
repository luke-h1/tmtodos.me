/* eslint-disable radix */
import "dotenv/config";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";
import { Note } from "../entities/Note";
import { isAuth } from "../utils/isAuth";
import { MyContext } from "../types";
import { User } from "../entities/User";

@InputType()
class NoteInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
class PaginatedNotes {
  @Field(() => [Note])
  notes: Note[];

  @Field()
  hasMore: boolean;
}

@Resolver(Note)
export class noteResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() note: Note) {
    return note.text.slice(0, 50);
  }

  @FieldResolver(() => User)
  creator(@Root() note: Note, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(note.creatorId);
  }

  @Query(() => [Note])
  async notes(
    @Arg("limit") limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedNotes> {
    const realLimit = Math.min(150, limit);
    const realLimitPlusOne = realLimit + 1;
    const replacements: any[] = [realLimitPlusOne];
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const notes = await getConnection().query(
      `
        SELECT n.* 
        from note n 
        ${cursor ? `where n."createdAt" < $2` : ""}
        ORDER BY n."createdAt" DESC 
        limit $1
      `,
      replacements
    );
    return {
      notes: notes.slice(0, realLimit),
      hasMore: notes.length === realLimitPlusOne,
    };
  }

  @Query(() => Note, { nullable: true })
  note(@Arg("id", () => Int) id: number): Promise<Note | undefined> {
    return Note.findOne(id);
  }

  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async createNote(
    @Arg("input") input: NoteInput,
    @Ctx() { req }: MyContext
  ): Promise<Note> {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("not authenticated");
    }
    const token = authorization.split(" ")[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return Note.create({
      ...input,
      creatorId: payload.userId,
    }).save();
  }

  @Mutation(() => Note, { nullable: true })
  async updateNote(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext
  ): Promise<Note | null> {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("not authenticated");
    }
    const token = authorization.split(" ")[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    const result = await getConnection()
      .createQueryBuilder()
      .update(Note)
      .set({ title, text })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: payload.userId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteNote(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("not authenticated");
    }
    const token = authorization.split(" ")[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    await Note.delete({ id, creatorId: payload.userId });
    return true;
  }
}
