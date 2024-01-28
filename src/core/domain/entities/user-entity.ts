import { randomUUID } from 'crypto';
import { CompanyEntity } from './company-entity';

type IUserEntityConstructor = {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
};

export class UserEntity {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  company?: Omit<CompanyEntity, 'users'>;

  constructor({
    id,
    email,
    name,
    passwordHash,
    createdAt,
  }: IUserEntityConstructor) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt ?? new Date();
  }
}
