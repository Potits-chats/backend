import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

// Token global for development
// La première fois que l'on lance l'application, on récupère le token sinon on utilise le token global
global.token = '';

@Injectable()
export class DevMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('🚀 ~ DevMiddleware ~ use ~ use:');
    // if (!req.headers.authorization && !global.token) {
    //   const { access_token } = this.authService.signIn('john', 'changeme');
    //   global.token = access_token;
    //   // Token global for development
    //   req.headers.authorization = `Bearer ${global.token}`;
    //   req.body['userId'] = process.env.UserId;
    // }
    next();
  }
}
