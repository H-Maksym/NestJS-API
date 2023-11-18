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
    await this.cookiesService.setRefreshTokenToCookies(tokens, res);
    res.status(HttpStatus.CREATED).json({
      'access-token': tokens.accessToken,
    });
  }

  @Post('sign-out')
  signOut() {
    return null;
  }

  @Get('refresh-tokens')
  async refreshToken(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response
  ) {
    if (!this.refreshToken) {
      throw new UnauthorizedException();
    }
    return await this.authService.refreshToken(refreshToken);
  }
}
