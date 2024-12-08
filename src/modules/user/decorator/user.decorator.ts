import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator<string>(
  (data: string, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    const user = request?.user?.user as User;
    return user;
  },
);
