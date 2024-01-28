import { UserEntity } from './user-entity';

describe('UserEntity', () => {
  it('should be able to create a new user', () => {
    const user = new UserEntity({
      name: 'user-test',
      email: 'email-test@email.com',
      passwordHash: 'passwordHash',
    });

    expect(user.id).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.name).toBe('user-test');
    expect(user.email).toBe('email-test@email.com');
    expect(user.passwordHash).toBe('passwordHash');
  });
});
