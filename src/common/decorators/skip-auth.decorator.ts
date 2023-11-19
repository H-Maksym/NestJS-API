import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
export const isPublic = (
  ctx: ExecutionContext,
  reflector: Reflector
): boolean => {
  const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    ctx.getHandler,
    ctx.getClass(),
  ]);
  return isPublic;
};