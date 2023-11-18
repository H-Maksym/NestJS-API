import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { UserService } from '@modules/user/user.service';
import { Tokens } from './interfaces';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository
  ) {}

  private async generateTokens(user: User): Promise<Tokens> {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        roles: user.roles,
      });

    const refreshToken = await this.authRepository.setRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  //COMMENT sign up by email, password, repeat password
  async signUp(signUpDto: SignUpDto) {
    const user: User | null = await this.userService
      .findOneByEmail(signUpDto.email)
      .catch(err => {
        //TODO Add Logger
        this.logger.error(err);
        return null;
      });
    if (user) {
      throw new ConflictException('User with this email is already registered');
    }
    return this.userService.create(signUpDto).catch(err => {
      //TODO Add Logger
      this.logger.error(err);
      return null;
    });
  }

  //COMMENT sign in by email, password
  async signIn(signInDto: SignInDto): Promise<Tokens> {
    const user: User | null = await this.userService
      .findOneByEmail(signInDto.email)
      .catch(err => {
        //TODO Add Logger
        this.logger.error(err);
        return null;
      });

    if (!user) {
      throw new UnauthorizedException('Email or password are invalid');
    }

    if (user.password && !compareSync(signInDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    const tokens: Tokens = await this.generateTokens(user);

    return tokens;
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    //COMMENTS we delete token, if token does not return - token is absent in db

    const token = await this.authRepository.deleteToken(refreshToken);
    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOneById(token.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.generateTokens(user);
  }
}
