import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Define a custom type for headers that includes the 'authorization' property
@Injectable()
export class DevMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    // const headers = req.headers as HeadersWithAuthorization;
    // if (!headers.authorization && !global.token) {
    //   // Await the result of signIn method
    //   const { access_token } = await this.authService.signIn(
    //     process.env.USER1_EMAIL,
    //     process.env.USER1_PASSWORD,
    //   );
    //   global.token = access_token;
    //   headers.authorization = `Bearer ${global.token}`;
    //   req.body['userId'] = process.env.USER1_USERID;
    // } else {
    //   if (!req.headers.authorization && global.token) {
    //     req.headers.authorization = `Bearer ${global.token}`;
    //     req.body['userId'] = process.env.USER1_USERID;
    //   }
    // }
    next();
  }
}
