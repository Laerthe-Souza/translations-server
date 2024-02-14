import { pbkdf2Sync, randomUUID } from 'crypto';
import { Email } from './email';
import { envs } from '../../infra/envs';

type UserConstructor = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

type UserRestoreCommand = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

type UserCreateCommand = {
  name: string;
  email: string;
  password: string;
};

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  private constructor({
    id,
    name,
    email,
    password,
    createdAt,
  }: UserConstructor) {
    this.id = id;
    this.name = name;
    this.email = new Email(email).getValue();
    this.password = password;
    this.createdAt = createdAt;
  }

  static create(user: UserCreateCommand) {
    const id = randomUUID();
    const createdAt = new Date();
    const password = this.hashPassword(user.password);

    return new User({
      ...user,
      id,
      createdAt,
      password,
    });
  }

  static restore(user: UserRestoreCommand): User {
    return new User(user);
  }

  private static hashPassword(password: string): string {
    const salt = envs().HASH_PASSWORD_SALT;

    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }

  passwordMatch(password: string): boolean {
    const salt = envs().HASH_PASSWORD_SALT;

    const passwordHash = pbkdf2Sync(
      password,
      salt,
      1000,
      64,
      'sha512',
    ).toString('hex');

    return passwordHash === this.password;
  }
}
