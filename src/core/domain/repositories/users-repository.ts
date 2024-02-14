import { User } from '../entities/user.entity';

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
