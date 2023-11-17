import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/config';
import { ValidationPipe } from '@nestjs/common';
// import { logger } from 'src/middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validation pipe for income data
  //whitelist: true - not adding any fields does not match DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  //COMMENT set cors request
  // app.enableCors();

  //COMMENT set global prefix
  app.setGlobalPrefix('api');

  //COMMENT config swagger
  setupSwagger(app);

  //COMMENT logger
  // app.use(logger);

  //COMMENT listen server on port
  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

//COMMENT run server
bootstrap();
