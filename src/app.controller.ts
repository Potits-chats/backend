import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Route de test' })
  @Get('/hello')
  getHello2() {
    return this.appService.getHello();
  }
}
