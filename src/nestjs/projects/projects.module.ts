import { ProjectsService } from '@core/application/services/projects.service';
import { ProjectsRepositoryInfra } from '@core/infra/database/repositories/projects-repository';
import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';

@Module({
  controllers: [ProjectsController],
  providers: [
    {
      provide: ProjectsService,
      useFactory: (projectsRepository: ProjectsRepositoryInfra) => {
        return new ProjectsService(projectsRepository);
      },
      inject: [ProjectsRepositoryInfra],
    },
  ],
})
export class ProjectsModule {}
