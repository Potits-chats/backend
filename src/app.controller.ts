import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HasRoles, Role } from './auth/roles.decorator';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello() {
    return 'Hello World!';
  }

  @ApiOperation({ summary: 'Route de test' })
  @Get('/hello')
  getHello2() {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Route de test : get token' })
  @ApiTags('auth')
  @Get('token')
  getToken() {
    return this.authService.signIn('john', 'changeme');
  }

  @ApiOperation({ summary: 'Route de test : auth + admin' })
  @HasRoles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiTags('auth')
  @ApiBearerAuth()
  @Get('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Route de test : auth + user' })
  @HasRoles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiTags('auth')
  @Get('user')
  @ApiBearerAuth()
  onlyUser(@Request() req) {
    return req.user;
  }
}
