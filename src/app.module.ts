import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from '@common/middlewares';

import { ServerModule } from '@modules/server/server.module';
import { CookieModule } from '@modules/cookie/cookie.module';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticateMiddleware } from '@common/middlewares/authenticate.middlewares';
import { AuthService } from '@modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '@modules/auth/repository/auth.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServerModule,
    CookieModule,
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    AuthService,
    AuthRepository,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, AuthenticateMiddleware).forRoutes('*');
  }
}
