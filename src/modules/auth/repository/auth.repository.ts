import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import { PrismaService } from '@database/prisma/prisma.service';
import { Token } from '@prisma/client';
import { convertToSecondsUtil } from '@common/utils';
import { JWT_REFRESH_TOKEN_EXP } from '@common/constants';

@Injectable()
export class AuthRepository {
  private readonly logger = new Logger(AuthRepository.name);

  constructor(
    private readonly db: PrismaService,
    private readonly configService: ConfigService
  ) {}

  //COMMENT get refresh token
  async setRefreshToken(
    userId: string,
    userAgent: string
  ): Promise<Token | null> {
    const _token = await this.db.token.findFirst({
      where: { userId, userAgent },
    });

    const expires =
      new Date().getTime() +
      convertToSecondsUtil(
        this.configService.get(JWT_REFRESH_TOKEN_EXP) || '1M'
      ) *
        1000;

    const token = _token?.token ?? '';
    return await this.db.token
      .upsert({
        where: { token },
        update: {
          token: v4(),
          expires: new Date(expires),
        },
        create: {
          token: v4(),
          expires: new Date(expires),
          userId,
          userAgent,
        },
      })
      .catch(err => {
        //TODO Add Logger
        this.logger.error(err);
        return null;
      });
  }

  async getRefreshToken(refreshToken: string): Promise<Token | null> {
    return await this.db.token
      .findUnique({ where: { token: refreshToken } })
      .catch(err => {
        //TODO Add Logger
        this.logger.error(err);
        return null;
      });
  }

  async deleteRefreshToken(refreshToken: string): Promise<Token | null> {
    return await this.db.token
      .delete({
        where: { token: refreshToken },
      })
      .catch(err => {
        //TODO Add Logger
        this.logger.error(err);
        return null;
      });
  }
}
