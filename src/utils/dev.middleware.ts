import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

// Define a custom type for headers that includes the 'authorization' property
type HeadersWithAuthorization = {
  authorization?: string;
} & Record<string, string | string[] | undefined>;
@Injectable()
export class DevMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers as HeadersWithAuthorization;
    if (!headers.authorization && !global.token) {
      // Await the result of signIn method
      const { access_token } = await this.authService.signIn(
        process.env.USER1_USERNAME,
        process.env.USER1_PASSWORD,
      );
      global.token = access_token;
      headers.authorization = `Bearer ${global.token}`;
      req.body['userId'] = process.env.UserId;
    } else {
      if (!req.headers.authorization && global.token) {
        req.headers.authorization = `Bearer ${global.token}`;
        req.body['userId'] = process.env.UserId;
      }
    }
    next();
  }
}
