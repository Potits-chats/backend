import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Connexion' })
  @ApiBody({ description: 'body:any someMethod' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiTags('auth')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Profil' })
  @ApiBody({ description: 'body:any someMethod' })
  @UseGuards(AuthGuard)
  @ApiTags('auth')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
