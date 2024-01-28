import { CompanyEntity } from './company-entity';
import { UserEntity } from './user-entity';

describe('CompanyEntity', () => {
  it('should be able to create a new company', () => {
    const user = new UserEntity({
      name: 'user-test',
      email: 'email-test@email.com',
      passwordHash: 'passwordHash',
    });

    const company = new CompanyEntity({
      name: 'company-test',
      email: 'email-test@email.com',
      user,
    });

    expect(company.id).toBeDefined();
    expect(company.createdAt).toBeDefined();
    expect(company.name).toBe('company-test');
    expect(company.email).toBe('email-test@email.com');
  });
});
