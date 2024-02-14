import { User } from '@core/domain/entities/user.entity';
import { UsersRepository } from '@core/domain/repositories/users-repository';
import { Prisma } from '@prisma/client';

export class UsersRepositoryInfra implements UsersRepository {
  constructor(private readonly repository: Prisma.UserDatabaseDelegate) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return User.restore(user);
  }

  async create(user: User): Promise<User> {
    const result = await this.repository.create({
      data: user,
    });

    return User.restore(result);
  }
}
