import { NestFactory } from '@nestjs/core';
import { AppModule } from './nestjs/app.module';
import { envs } from './core/infra/envs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(envs().PORT, () =>
    Logger.log(`Server is running on port ${envs().PORT}`, 'NestApplication'),
  );
}

bootstrap();
