import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/config';

// const PORT = process.env || 3001;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ('check live server');
  app.use('/live', (_req, res) => {
    res.json({ status: true });
  });

  //config swagger
  setupSwagger(app);

  //run server
  await app.listen(3000);
}
bootstrap();
