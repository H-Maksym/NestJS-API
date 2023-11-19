import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { REFRESH_TOKEN } from '@common/constants';
import { AuthService } from './auth.service';
import { CookieService } from '../cookie/cookie.service';
import { Cookie, SkipAuth, UserAgent } from '@common/decorators';

import { SignInDto, SignUpDto } from './dto';
import { ITokens } from './interfaces';
import { UserResponse } from '../user/responses/user.response';

@ApiTags('⛔ auth service')
@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookiesService: CookieService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sign-up')
  @ApiOperation({ summary: '🎭 sign-up' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    const user = await this.authService.signUp(signUpDto);
    if (!user) {
      throw new BadRequestException(
        `Unable to sign up with data ${JSON.stringify(signUpDto)}`
      );
    }
    return new UserResponse(user);
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @UserAgent() userAgent: string,
    @Res() res: Response
  ) {
    const tokens = await this.authService.signIn(signInDto, userAgent);
    if (!tokens) {
      throw new BadRequestException(
        `Unable to sign in with data ${JSON.stringify(signInDto)}`
      );
    }
    const {
      accessToken,
      refreshToken: { token, expires },
    } = tokens;
    await this.cookiesService.setToCookies(
      {
        name: REFRESH_TOKEN,
        value: token,
        expires,
      },
      res
    );
    res.status(HttpStatus.CREATED).json({
      'access-token': accessToken,
    });
  }

  @Post('sign-out')
  signOut() {
    return null;
  }

  @Get('refresh')
  async refreshToken(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @UserAgent() userAgent: string
  ) {
    //COMMENT if token exists or delete from cookies independently
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens: ITokens = await this.authService.refreshToken(
      refreshToken,
      userAgent
    );

    if (!tokens) {
      throw new UnauthorizedException();
    }

    const {
      accessToken,
      refreshToken: { token, expires },
    } = tokens;

    await this.cookiesService.setToCookies(
      {
        name: REFRESH_TOKEN,
        value: token,
        expires,
      },
      res
    );
    res.status(HttpStatus.CREATED).json({
      'access-token': accessToken,
    });
  }
}
