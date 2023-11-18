import { ExecutionContext, createParamDecorator } from '@nestjs/common';

//COMMENT decorator: get cookie by name cookie
export const Cookie = createParamDecorator(
  (keyCookie: string, ctx: ExecutionContext) => {
    if (!keyCookie) {
      return null;
    }
    const request = ctx.switchToHttp().getRequest();
    return keyCookie && keyCookie in request.cookies
      ? request.cookies[keyCookie]
      : request.cookies;
  }
);
