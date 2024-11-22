import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const LOTR_API_URL = process.env.LOTR_API_URL;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['localhost', '127.0.0.1', LOTR_API_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
