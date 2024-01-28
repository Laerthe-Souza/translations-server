import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticateUserDTO } from 'src/core/domain/dtos/authenticate-user-dto';
import { AuthenticateUserService } from 'src/core/domain/services/authenticate-user-service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService,
  ) {}

  @Post('authenticate')
  @HttpCode(200)
  async authenticate(@Body() data: AuthenticateUserDTO) {
    return this.authenticateUserService.perform(data);
  }
}
