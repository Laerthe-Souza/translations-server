import { pbkdf2Sync } from 'crypto';
import { AuthenticateUserDTO } from '../dtos/authenticate-user-dto';
import { UserEntity } from '../entities/user-entity';
import { UsersRepository } from '../repositories/users-repository';
import { HttpError } from '../errors/HttpError';

export class AuthenticateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async perform({ email, password }: AuthenticateUserDTO): Promise<UserEntity> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new HttpError('INVALID_CREDENTIALS');
    }

    const salt = process.env.HASH_PASSWORD_SALT;

    const passwordHash = pbkdf2Sync(
      password,
      salt,
      1000,
      64,
      'sha512',
    ).toString('hex');

    if (userAlreadyExists.passwordHash !== passwordHash) {
      throw new HttpError('INVALID_CREDENTIALS');
    }

    return userAlreadyExists;
  }
}
