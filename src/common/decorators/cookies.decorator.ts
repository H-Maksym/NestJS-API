import { ExecutionContext, createParamDecorator } from '@nestjs/common';

//COMMENT decorator: get cookie by name cookie
export const Cookie = createParamDecorator(
  (keyCookie: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return keyCookie ? request.cookies[keyCookie] : request.cookies;
  }
);
