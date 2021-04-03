import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { compare, hash } from 'bcryptjs';
import { User } from '../entities/User';
import { MyContext } from '../types';

import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../utils/auth';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi';
  }

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext){
    // this is the current logged in user so can show them their own email
    const authorization = req.headers.authorization;
    const token = authorization?.split(' ')[1];
    const payload: any = verify(token!, process.env.ACCESS_TOKEN_SECRET!);
    if(payload.userId === user.id) {
      return user.email;
    }
    // current user is trying to see someone elses email 🙅‍♂️
    return '';
  }


  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers.authorization;
    if (!authorization) {
      return null;
    }
    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '');
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext,
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Could not find that user');
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error('bad password');
      //   need to handle these errors better and send something useful to frontend
    }
    //   login successful
    sendRefreshToken(res, createRefreshToken(user));
    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      // user already exists
      // don't do anything
      return false;
    }
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  }
}
