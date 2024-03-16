import { checkServices } from '@core/infra/checkServices';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  async health() {
    await checkServices();

    return {
      status: 'OK',
    };
  }
}
