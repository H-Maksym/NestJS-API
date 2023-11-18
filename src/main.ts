import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/config';
// import { logger } from 'src/middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validation pipe for income data
  //whitelist: true - not adding any fields does not match DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //Custom Prisma client exception filter
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  //COMMENT set cors request
  // app.enableCors();

  //COMMENT set cookies
  app.use(cookieParser());

  //COMMENT set global prefix
  app.setGlobalPrefix('api');

  //COMMENT config swagger
  setupSwagger(app);

  //COMMENT logger
  // app.use(logger);

  //COMMENT listen server on port
  await app.listen(process.env.SERVER_PORT || 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

//COMMENT run server
bootstrap();
