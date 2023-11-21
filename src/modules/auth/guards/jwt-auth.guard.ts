import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { isSkipAuth } from '@common/decorators/skip-auth.decorator';
import { Observable } from 'rxjs';
import { REFRESH_TOKEN } from '@common/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    ctx: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest();

    const accessToken = req.headers.authorization?.split(' ')[1];
    const refreshToken =
      req.headers.cookie?.split(`${REFRESH_TOKEN}=`)[1] ?? '';

    //COMMENT Checks if the deleted refresh token with the cookie by client when the access token is available
    if (accessToken && !refreshToken) {
      throw new UnauthorizedException();
    }

    const _isSkipAuth = isSkipAuth(ctx, this.reflector);
    if (_isSkipAuth) {
      return true;
    }

    return super.canActivate(ctx);
  }
}
