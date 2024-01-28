import { CompanyEntity } from '../entities/company-entity';

export interface CompaniesRepository {
  insert(company: CompanyEntity): Promise<CompanyEntity>;
  findByEmail(email: string): Promise<CompanyEntity | null>;
}
