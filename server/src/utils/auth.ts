import { response } from 'express';
import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';

export const createAccessToken = (user: User) => sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
  expiresIn: '15m',
});

export const createRefreshToken = (user: User) => sign(
  { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    },
);

export const sendRefreshToken = (res: typeof response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};
