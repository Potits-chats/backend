import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  auth,
  InvalidTokenError,
  UnauthorizedError,
} from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.headers.authorization) {
      this.logger.error('No token !');
    } else {
      this.logger.debug('Token : ' + request.headers.authorization);
    }
    const response = context.switchToHttp().getResponse<Response>();

    const validateAccessToken = promisify(auth());

    try {
      await validateAccessToken(request, response);

      return true;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw new UnauthorizedException('Bad credentials');
      }

      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException('Requires authentication');
      }

      throw new InternalServerErrorException();
    }
  }
}
