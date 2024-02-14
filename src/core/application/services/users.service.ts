import { User } from '@core/domain/entities/user.entity';
import { UsersRepository } from '@core/domain/repositories/users-repository';
import { AuthenticateUserDTO } from '../dtos/authenticate-user.dto';
import { HttpError } from '../errors/HttpError';
import { CreateUserDTO } from '../dtos/create-user.dto';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async authenticate({ email, password }: AuthenticateUserDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new HttpError('INVALID_CREDENTIALS');
    }

    if (!user.passwordMatch(password)) {
      throw new HttpError('INVALID_CREDENTIALS');
    }

    return user;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = User.create(data);

    const emailAlreadyExists = await this.usersRepository.findByEmail(
      user.email,
    );

    if (emailAlreadyExists) {
      throw new HttpError('EMAIL_ALREADY_EXISTS');
    }

    return this.usersRepository.create(user);
  }
}
