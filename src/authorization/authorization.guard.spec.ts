/* eslint-disable security/detect-possible-timing-attacks */
import {
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { Request, Response } from 'express';
import {
  InvalidTokenError,
  UnauthorizedError,
} from 'express-oauth2-jwt-bearer';
import { Test, TestingModule } from '@nestjs/testing';
import { promisify } from 'util';

jest.mock('util', () => ({
  promisify: jest.fn(),
}));

jest.mock('express-oauth2-jwt-bearer', () => ({
  auth: jest
    .fn()
    .mockImplementation(
      () => (req: Request, res: Response, next: () => void) => {
        const token = req.headers.authorization;
        if (!token) {
          throw new UnauthorizedError('No token provided');
        }
        if (token === 'Bearer invalidToken') {
          throw new InvalidTokenError('Invalid token');
        }
        if (token === 'Bearer unauthorizedToken') {
          throw new UnauthorizedError('Unauthorized');
        }
        next();
      },
    ),
  InvalidTokenError: class InvalidTokenError extends Error {},
  UnauthorizedError: class UnauthorizedError extends Error {},
}));

describe('AuthorizationGuard', () => {
  let authorizationGuard: AuthorizationGuard;
  let mockContext: Partial<ExecutionContext>;
  let validateAccessToken: jest.Mock;

  const mockRequest = {
    headers: {
      authorization: 'Bearer testToken',
    },
  } as unknown as Request;

  const mockResponse = {} as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizationGuard],
    }).compile();

    authorizationGuard = module.get<AuthorizationGuard>(AuthorizationGuard);
    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
    };
    validateAccessToken = jest.fn();
    (promisify as unknown as jest.Mock).mockReturnValue(validateAccessToken);
  });

  it('should allow access when the token is valid', async () => {
    validateAccessToken.mockResolvedValue(true);

    const result = await authorizationGuard.canActivate(
      mockContext as ExecutionContext,
    );

    expect(result).toBe(true);
    expect(validateAccessToken).toHaveBeenCalledWith(mockRequest, mockResponse);
  });

  it('should throw UnauthorizedException for InvalidTokenError', async () => {
    validateAccessToken.mockRejectedValue(
      new InvalidTokenError('Invalid token'),
    );

    await expect(
      authorizationGuard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException for UnauthorizedError', async () => {
    validateAccessToken.mockRejectedValue(
      new UnauthorizedError('Unauthorized'),
    );

    await expect(
      authorizationGuard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw InternalServerErrorException for other errors', async () => {
    validateAccessToken.mockRejectedValue(new Error('Other error'));

    await expect(
      authorizationGuard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('should log an error when no token is provided', async () => {
    const loggerErrorSpy = jest.spyOn(authorizationGuard['logger'], 'error');
    const loggerDebugSpy = jest.spyOn(authorizationGuard['logger'], 'debug');
    mockRequest.headers.authorization = '';

    await authorizationGuard.canActivate(mockContext as ExecutionContext);

    expect(loggerErrorSpy).toHaveBeenCalledWith('No token !');
    expect(loggerDebugSpy).not.toHaveBeenCalled();
  });
});
