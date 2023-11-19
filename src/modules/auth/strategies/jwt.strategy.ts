import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from '@common/constants';
import { IJwtPayload } from '../interfaces';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
