import { ProjectsRepositoryInfra } from '@core/infra/database/repositories/projects-repository';
import { Global, Module, Provider } from '@nestjs/common';
import { prismaClient } from 'src/core/infra/database';
import { UsersRepositoryInfra } from 'src/core/infra/database/repositories/users-repository';

export const repositories: Provider[] = [
  {
    provide: UsersRepositoryInfra,
    useFactory: () => {
      return new UsersRepositoryInfra(prismaClient.userDatabase);
    },
  },
  {
    provide: ProjectsRepositoryInfra,
    useFactory: () => {
      return new ProjectsRepositoryInfra(prismaClient.projectDatabase);
    },
  },
];

@Global()
@Module({
  providers: repositories,
  exports: repositories,
})
export class RepositoriesModule {}
