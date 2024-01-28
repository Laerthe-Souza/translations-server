import { CompaniesRepository } from 'src/core/domain/repositories/companies-repository';
import { Prisma } from '@prisma/client';
import { CompanyEntity } from 'src/core/domain/entities/company-entity';

export class CompaniesRepositoryInfra implements CompaniesRepository {
  constructor(private readonly repository: Prisma.CompanyDelegate) {}

  async insert({
    id,
    name,
    email,
    users,
    createdAt,
  }: CompanyEntity): Promise<CompanyEntity> {
    const company = await this.repository.create({
      data: {
        id,
        email,
        name,
        createdAt,
        users: { createMany: { data: users } },
      },
      include: { users: true },
    });

    return company;
  }

  async findByEmail(email: string): Promise<CompanyEntity> {
    const company = await this.repository.findUnique({
      where: { email },
      include: { users: true },
    });

    return company;
  }
}
