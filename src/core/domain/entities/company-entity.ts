import { randomUUID } from 'crypto';
import { UserEntity } from './user-entity';

type ICompanyEntityConstructor = {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  user: {
    name: string;
    email: string;
    passwordHash: string;
  };
};

export class CompanyEntity {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  users: Omit<UserEntity, 'company'>[];

  constructor({ id, email, name, createdAt, user }: ICompanyEntityConstructor) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.email = email;
    this.createdAt = createdAt ?? new Date();
    this.users = [new UserEntity(user)];
  }
}
