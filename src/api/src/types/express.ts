import { Request } from 'express';
import { User } from '@prisma/client';

export interface IRequest extends Request {
  user: User;
}
