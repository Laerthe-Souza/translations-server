import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDTO } from '../../core/domain/dtos/create-company-dto';
import { CreateCompanyService } from 'src/core/domain/services/create-company.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly createCompanyService: CreateCompanyService) {}

  @Post()
  async create(@Body() data: CreateCompanyDTO) {
    return this.createCompanyService.perform(data);
  }
}
