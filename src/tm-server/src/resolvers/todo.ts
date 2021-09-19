/* eslint-disable radix */
import 'dotenv-safe/config';
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
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Upload, Delete } from '../utils/s3';
import { Todo } from '../entities/Todo';
import { MyContext } from '../shared/types';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { S3TodoImageKey } from '../shared/constants';

@InputType()
class TodoInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
class PaginatedTodos {
  @Field(() => [Todo])
  todos: Todo[];

  @Field()
  hasMore: boolean;
}

@Resolver(Todo)
export class todoResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() todo: Todo) {
    return todo.text.slice(0, 50);
  }

  @FieldResolver(() => User)
  creator(@Root() todo: Todo, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(todo.creatorId);
  }

  @Query(() => PaginatedTodos)
  async todos(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext,
  ): Promise<PaginatedTodos> {
    const realLimit = Math.min(150, limit);
    const realLimitPlusOne = realLimit + 1;
    const replacements: any[] = [realLimitPlusOne];
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }
    const todos = await getConnection().query(
      `
      SELECT t.* FROM "todo" t 
      WHERE (t."creatorId" = $1)
      ORDER BY t."createdAt" DESC 
      `,
      [req.session.userId],
    );
    return {
      todos: todos.slice(0, realLimit),
      hasMore: todos.length === realLimitPlusOne,
    };
  }

  @Query(() => Todo, { nullable: true })
  todo(@Arg('id', () => Int) id: number): Promise<Todo | undefined> {
    return Todo.findOne(id);
  }

  @Mutation(() => Todo)
  @UseMiddleware(isAuth)
  async createTodo(
    @Arg('input') input: TodoInput,
    @Ctx() { req }: MyContext,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload,
  ): Promise<Todo> {
    const { image: s3Image, imageFileName } = await Upload(
      image.createReadStream,
      image.filename,
      S3TodoImageKey,
    );

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Todo)
      .values({
        ...input,
        creatorId: req.session.userId,
        imageFileName,
        image: s3Image,
      })
      .returning('*')
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Todo, { nullable: true })
  async updateTodo(
    @Arg('id', () => Int) id: number,
    @Arg('title') title: string,
    @Arg('text') text: string,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload,
    @Ctx() { req }: MyContext,
  ): Promise<Todo | null> {
    const { image: s3Image, imageFileName } = await Upload(
      image.createReadStream,
      image.filename,
      S3TodoImageKey,
    );
    const result = await getConnection()
      .createQueryBuilder()
      .update(Todo)
      .set({
        title,
        text,
        image: s3Image,
        imageFileName,
      })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning('*')
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTodo(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<boolean> {
    const todo = await Todo.findOne(id);
    if (todo) {
      await Delete(todo.imageFileName);
      await Todo.delete({ id, creatorId: req.session.userId });
    }
    return true;
  }
}
