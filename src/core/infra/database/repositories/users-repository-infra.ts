import { UsersRepository } from 'src/core/domain/repositories/users-repository';
import { Prisma } from '@prisma/client';
import { UserEntity } from 'src/core/domain/entities/user-entity';

export class UsersRepositoryInfra implements UsersRepository {
  constructor(private readonly repository: Prisma.UserDelegate) {}

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findUnique({
      where: { email },
      include: { company: true },
    });

    return user;
  }
}
