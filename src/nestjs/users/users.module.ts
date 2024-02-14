import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from '@core/domain/repositories/users-repository';
import { UsersRepositoryInfra } from '@core/infra/database/repositories/users-repository';
import { UsersService } from '@core/application/services/users.service';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useFactory: (usersRepository: UsersRepository) => {
        return new UsersService(usersRepository);
      },
      inject: [UsersRepositoryInfra],
    },
  ],
})
export class UsersModule {}
