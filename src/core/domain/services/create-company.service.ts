import { CreateCompanyDTO } from 'src/core/domain/dtos/create-company-dto';
import { CompanyEntity } from '../entities/company-entity';
import { CompaniesRepository } from '../repositories/companies-repository';
import { UsersRepository } from '../repositories/users-repository';
import { pbkdf2Sync } from 'crypto';
import { HttpError } from '../errors/HttpError';

export class CreateCompanyService {
  constructor(
    private readonly companiesRepository: CompaniesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async perform({
    name,
    email,
    user,
  }: CreateCompanyDTO): Promise<CompanyEntity> {
    const companyAlreadyExists =
      await this.companiesRepository.findByEmail(email);

    if (companyAlreadyExists) {
      throw new HttpError('COMPANY_ALREADY_EXISTS');
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email,
    );

    if (userAlreadyExists) {
      throw new HttpError('USER_ALREADY_EXISTS');
    }

    if (user.password !== user.confirmPassword) {
      throw new HttpError('PASSWORD_NOT_MATCH');
    }

    const salt = process.env.HASH_PASSWORD_SALT;

    const passwordHash = pbkdf2Sync(
      user.password,
      salt,
      1000,
      64,
      'sha512',
    ).toString('hex');

    const company = new CompanyEntity({
      name,
      email,
      user: { name: user.name, email: user.email, passwordHash },
    });

    return this.companiesRepository.insert(company);
  }
}
