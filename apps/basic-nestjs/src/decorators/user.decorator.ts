import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Extended Request type with user property
interface RequestWithUser extends Request {
  user?: {
    role?: string;
    visitedTimes?: number;
    [key: string]: unknown;
  };
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    if (!request.user) {
      return null;
    }
    if (!request.user.visitedTimes) {
      request.user.visitedTimes = 0;
    }
    request.user.visitedTimes++;
    return request.user;
  },
);

export const UserObjectValue = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!request.user) {
      return null;
    }
    return data ? user?.[data as string] : user;
  },
);
