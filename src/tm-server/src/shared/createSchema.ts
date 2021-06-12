import { buildSchema } from 'type-graphql';
import { todoResolver } from '../resolvers/todo';
import { UserResolver } from '../resolvers/user';

export const createSchema = async () => await buildSchema({
  resolvers: [todoResolver, UserResolver],
  validate: false,
});
