import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepositoryInfra } from 'src/core/infra/database/repositories/users-repository-infra';
import { AuthenticateUserService } from 'src/core/domain/services/authenticate-user-service';
import { UsersRepository } from 'src/core/domain/repositories/users-repository';
import { prismaClient } from 'src/core/infra/database';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UsersRepositoryInfra,
      useFactory: () => {
        return new UsersRepositoryInfra(prismaClient.user);
      },
    },
    {
      provide: AuthenticateUserService,
      useFactory: (usersRepository: UsersRepository) => {
        return new AuthenticateUserService(usersRepository);
      },
      inject: [UsersRepositoryInfra],
    },
  ],
})
export class UsersModule {}
