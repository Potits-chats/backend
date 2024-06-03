import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { claimCheck, InsufficientScopeError } from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';
import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate } from '@nestjs/common/interfaces';
import { Injectable, Type } from '@nestjs/common';

jest.mock('util', () => ({
  promisify: jest.fn(),
}));

jest.mock('express-oauth2-jwt-bearer', () => ({
  claimCheck: jest
    .fn()
    .mockImplementation((fn: (payload: any) => boolean) => fn),
  InsufficientScopeError: class InsufficientScopeError extends Error {},
}));

function createPermissionsGuard(
  requiredRoutePermissions: string[],
): Type<CanActivate> {
  @Injectable()
  class PermissionsGuardImpl implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const response = context.switchToHttp().getResponse<Response>();

      const permissionCheck = promisify(
        claimCheck((payload) => {
          const permissionsJwtClaim = (payload.permissions as string[]) || [];

          const hasRequiredRoutePermissions = requiredRoutePermissions.every(
            (requiredRoutePermission) =>
              permissionsJwtClaim.includes(requiredRoutePermission),
          );

          if (!hasRequiredRoutePermissions) {
            throw new InsufficientScopeError();
          }

          return hasRequiredRoutePermissions;
        }),
      );

      try {
        await permissionCheck(request, response);

        return true;
      } catch (error) {
        throw new ForbiddenException('Permission denied');
      }
    }
  }

  return PermissionsGuardImpl;
}

export const PermissionsGuard = (
  routePermissions: string[],
): Type<CanActivate> => createPermissionsGuard(routePermissions);

describe('PermissionsGuard', () => {
  let guard: CanActivate;
  let mockContext: Partial<ExecutionContext>;
  let permissionCheck: jest.Mock;

  const mockRequest = {
    headers: {
      authorization: 'Bearer testToken',
    },
  } as unknown as Request;

  const mockResponse = {} as Response;

  beforeEach(async () => {
    const routePermissions = ['required_permission'];
    const Guard = createPermissionsGuard(routePermissions);

    const module: TestingModule = await Test.createTestingModule({
      providers: [Guard],
    }).compile();

    guard = module.get(Guard);
    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
    };

    permissionCheck = jest.fn();
    (promisify as unknown as jest.Mock).mockReturnValue(permissionCheck);
  });

  it('should allow access when the user has the required permissions', async () => {
    permissionCheck.mockResolvedValue(true);

    const result = await guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(true);
    expect(permissionCheck).toHaveBeenCalledWith(mockRequest, mockResponse);
  });

  it('should throw ForbiddenException when the user lacks required permissions', async () => {
    permissionCheck.mockRejectedValue(new InsufficientScopeError());

    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException for other errors', async () => {
    permissionCheck.mockRejectedValue(new Error('Some other error'));

    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(ForbiddenException);
  });
});
