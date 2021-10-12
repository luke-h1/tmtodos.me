import 'dotenv-safe/config';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
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
import { getConnection } from 'typeorm';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { User } from '../entities/User';
import { MyContext } from '../shared/types';

import { UsernamePasswordInput } from './UsernamePasswordInput';
import { validateRegister } from '../utils/validateRegister';
import {
  COOKIE_NAME,
  FORGET_PASSWORD_PREFIX,
  S3UserImageKey,
} from '../shared/constants';
import { sendEmail } from '../utils/sendEmail';
import { Upload } from '../utils/s3';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current logged in user so can show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }
    return '';
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext,
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'length must be greater than 2',
          },
        ],
      };
    }
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      };
    }
    // eslint-disable-next-line radix
    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);
    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists',
          },
        ],
      };
    }
    await User.update(
      { id: userIdNum },
      {
        password: await bcrypt.hash(newPassword, 12),
      },
    );
    await redis.del(key);
    // login user after changed password
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext,
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }
    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 2, // 2 days TODO: (change when deploying)
    );
    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}" target='_blank'>Reset Password</a>`, // TODO: setup mailgun on prod
    );
    return true;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // not logged in
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await bcrypt.hash(options.password, 12);
    let user;
    try {
      const { image: s3Image, imageFileName } = await Upload(
        image.createReadStream,
        image.filename,
        S3UserImageKey,
      );
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: options.email,
          password: hashedPassword,
          image: s3Image,
          imageFileName,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
      console.log(user);
    } catch (e) {
      if (e.code === '23505') {
        return {
          errors: [
            {
              field: 'email',
              message: 'email already taken',
            },
          ],
        };
      }
    }
    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: "That email doesn't exist",
          },
        ],
      };
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect credentials',
          },
        ],
      };
    }
    req.session.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => req.session.destroy((e: any) => {
      res.clearCookie(COOKIE_NAME);
      if (e) {
        console.log('LOGOUT ERROR', e);
        resolve(false);
        return;
      }
      resolve(true);
    }));
  }
}
