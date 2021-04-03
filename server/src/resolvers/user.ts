import { verify } from "jsonwebtoken";
import "dotenv/config";
import argon2 from "argon2";
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
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../utils/auth";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "src/utils/validateRegister";
import { getConnection } from "typeorm";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

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

  @Field(() => String, { nullable: true })
  accessToken?: String;
}

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi";
  }

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current logged in user so can show them their own email
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    const payload: any = verify(token!, process.env.ACCESS_TOKEN_SECRET!);
    if (payload.userId === user.id) {
      return user.email;
    }
    // current user is trying to see someone elses email 🙅‍♂️
    return "";
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers.authorization;
    if (!authorization) {
      return null;
    }
    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (e) {
      console.error(e);
      console.error("ME QUERY ERROR", e);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    try {
      sendRefreshToken(res, "");
      return true;
    } catch (e) {
      console.error("LOGOUT ERROR", e);
      return false;
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "That email doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
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
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { res }: MyContext
  ) {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (e) {
      if (e.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "email already taken 🙅‍♂️",
            },
          ],
        };
      }
    }
    // need to log in the user after they have registered here. Will need to set the cookie
    // return true;
    sendRefreshToken(res, createRefreshToken(user));
    return {
      accessToken: createAccessToken(user),
      user,
    };
  }
}
