import {
  Catch,
  HttpException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Catch(HttpException)
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl, body } = request;
      const { statusCode, statusMessage } = response;
      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.logger.error(
          message,
          body && JSON.stringify(body) != '{}'
            ? 'Req Body : ' + JSON.stringify(body)
            : '',
        );
      }
      if (statusCode >= 400) {
        return this.logger.error(
          message,
          body && JSON.stringify(body) != '{}'
            ? 'Req Body : ' + JSON.stringify(body)
            : '',
        );
      }
      return this.logger.log(message);
    });

    next();
  }
}
