import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'Hello World!';
  }

  @ApiOperation({ summary: 'Route de test' })
  @Get('/hello')
  getHello2() {
    return this.appService.getHello();
  }
}
