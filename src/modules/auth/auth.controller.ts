import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CookieService } from '../cookie/cookie.service';
import { Cookie } from '@common/decorators';
import { REFRESH_TOKEN } from '@common/constants';
import { Tokens } from './interfaces';

@ApiTags('⛔ auth service')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookiesService: CookieService
  ) {}

  @Post('sign-up')
  @ApiOperation({ summary: '🎭 sign-up' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    const user = await this.authService.signUp(signUpDto);
    if (!user) {
      throw new BadRequestException(
        `Unable to sign up with data ${JSON.stringify(signUpDto)}`
      );
    }
    return user;
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(signInDto);
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
    @Res() res: Response
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens: Tokens = await this.authService.refreshToken(refreshToken);
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
