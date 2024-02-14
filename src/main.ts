import { NestFactory } from '@nestjs/core';
import { AppModule } from './nestjs/app.module';
import { envs } from './core/infra/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envs().PORT);
}
bootstrap();
