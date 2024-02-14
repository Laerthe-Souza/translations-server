import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { ConfigModule } from '@nestjs/config';
import { envs } from '@core/infra/envs';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envs],
    }),
    UsersModule,
    ProjectsModule,
    RepositoriesModule,
  ],
})
export class AppModule {}
