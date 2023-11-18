import { NODE_ENV, REFRESH_TOKEN } from '@common/constants';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { ConfigService } from '@nestjs/config';
import { ICookie } from './interfaces';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  async setToCookies(cookie: ICookie, res: Response) {
    res.cookie(cookie.name, cookie.value, {
      //COMMENT cookies: not available through the remote control on the client
      httpOnly: true,
      //COMMENT cookies: access only from the same site
      sameSite: 'lax',
      //COMMENT cookies: expires cookie
      expires: new Date(cookie.expires),
      //COMMENT cookies: secure http for development or https protocol for production
      secure: this.configService.get(NODE_ENV, 'development') === 'production',
      //COMMENT cookies: accesses path for cookies
      path: '/',
    });
  }

  async removeRefreshTokenToCookies(res: Response) {
    res.clearCookie(REFRESH_TOKEN);
  }

  getCookies(/* res: Response */): string {
    return 'get cookies';
  }
}
