import { Module } from '@nestjs/common';
import { CompaniesRepository } from 'src/core/domain/repositories/companies-repository';
import { UsersRepository } from 'src/core/domain/repositories/users-repository';
import { CreateCompanyService } from 'src/core/domain/services/create-company.service';
import { CompaniesRepositoryInfra } from 'src/core/infra/database/repositories/companies-repository-infra';
import { UsersRepositoryInfra } from 'src/core/infra/database/repositories/users-repository-infra';
import { CompaniesController } from './companies.controller';
import { prismaClient } from 'src/core/infra/database';

@Module({
  imports: [],
  controllers: [CompaniesController],
  providers: [
    {
      provide: CompaniesRepositoryInfra,
      useFactory: () => {
        return new CompaniesRepositoryInfra(prismaClient.company);
      },
    },
    {
      provide: UsersRepositoryInfra,
      useFactory: () => {
        return new UsersRepositoryInfra(prismaClient.user);
      },
    },
    {
      provide: CreateCompanyService,
      useFactory: (
        companiesRepository: CompaniesRepository,
        usersRepository: UsersRepository,
      ) => {
        return new CreateCompanyService(companiesRepository, usersRepository);
      },
      inject: [CompaniesRepositoryInfra, UsersRepositoryInfra],
    },
  ],
})
export class CompaniesModule {}
