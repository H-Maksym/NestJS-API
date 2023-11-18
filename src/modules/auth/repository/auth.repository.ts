import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import { PrismaService } from '@database/prisma/prisma.service';
import { Token } from '@prisma/client';
import { convertToSecondsUtil } from '@common/utils';
import { JWT_REFRESH_TOKEN_EXP } from '@common/constants';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly db: PrismaService,
    private readonly configService: ConfigService
  ) {}

  //COMMENT get refresh token
  async setRefreshToken(userId: string): Promise<Token> {
    const expires =
      new Date().getTime() +
      convertToSecondsUtil(
        this.configService.get(JWT_REFRESH_TOKEN_EXP) || '1M'
      ) *
        1000;

    return await this.db.token.create({
      data: {
        token: v4(),
        expires: new Date(expires),
        userId,
      },
    });
  }

  async getRefreshToken(refreshToken: string): Promise<Token | null> {
    return await this.db.token.findUnique({ where: { token: refreshToken } });
  }

  async deleteToken(refreshToken: string): Promise<Token> {
    return await this.db.token.delete({ where: { token: refreshToken } });
  }
}
