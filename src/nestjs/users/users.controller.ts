import { AuthenticateUserDTO } from '@core/application/dtos/authenticate-user.dto';
import { CreateUserDTO } from '@core/application/dtos/create-user.dto';
import { UsersService } from '@core/application/services/users.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('authenticate')
  @HttpCode(200)
  async authenticate(@Body() data: AuthenticateUserDTO) {
    return this.usersService.authenticate(data);
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }
}
