import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from '@/common/middlewares';

import { ServerModule } from './modules/server/server.module';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), ServerModule, DatabaseModule, UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
