import { LoggerMiddleware } from './logger.middleware';
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger();
    middleware = new LoggerMiddleware();
    (middleware as any).logger = logger;
  });

  it('should log the request on finish with status code 200', () => {
    const req = { method: 'GET', originalUrl: '/test', body: {} } as Request;
    const res = {
      statusCode: 200,
      statusMessage: 'OK',
      on: jest.fn((event, callback) => callback()),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    jest.spyOn(logger, 'log');

    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith('GET /test 200 OK');
  });

  it('should log the request on finish with status code 500', () => {
    const req = {
      method: 'GET',
      originalUrl: '/test',
      body: { key: 'value' },
    } as Request;
    const res = {
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      on: jest.fn((event, callback) => callback()),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    jest.spyOn(logger, 'error');

    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(
      'GET /test 500 Internal Server Error',
      'Req Body : {"key":"value"}',
    );
  });
});
