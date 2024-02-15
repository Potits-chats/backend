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

  // @ApiOperation({ summary: 'Route de test : get token' })
  // @ApiTags('auth')
  // @Get('token')
  // getToken() {
  //   return this.authService.signIn('utilisateur1@example.com', '1234');
  // }

  // @ApiOperation({ summary: 'Route de test : auth + admin' })
  // @ApiTags('auth')
  // @ApiBearerAuth()
  // @Get('admin')
  // onlyAdmin(@Request() req) {
  //   return req.user;
  // }

  // @ApiOperation({ summary: 'Route de test : auth + user' })
  // @ApiTags('auth')
  // @Get('user')
  // @ApiBearerAuth()
  // onlyUser(@Request() req) {
  //   return req.user;
  // }
}
