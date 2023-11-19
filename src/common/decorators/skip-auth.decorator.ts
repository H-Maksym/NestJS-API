import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const IS_SKIP_AUTH_KEY = 'isSkipAuth';
export const SkipAuth = () => SetMetadata(IS_SKIP_AUTH_KEY, true);
export const isSkipAuth = (
  ctx: ExecutionContext,
  reflector: Reflector
): boolean => {
  const isSkipAuth = reflector.getAllAndOverride<boolean>(IS_SKIP_AUTH_KEY, [
    ctx.getHandler,
    ctx.getClass(),
  ]);
  return isSkipAuth;
};
