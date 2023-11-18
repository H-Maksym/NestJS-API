import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Tokens } from './interfaces';
import { User } from '@prisma/client';

@ApiTags('⛔ auth service')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    const tokens = await this.authService.signIn(signInDto);
    if (!tokens) {
      throw new BadRequestException(
        `Unable to sign in with data ${JSON.stringify(signInDto)}`
      );
    }
    return tokens;
  }

  @Post('sign-out')
  signOut() {
    return null;
  }

  @Get('refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
