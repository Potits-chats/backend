import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('../users/users.service');
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(() => {
    usersService = new UsersService(null);
    jwtService = new JwtService(null);
    authService = new AuthService(usersService, jwtService);
  });

  it('should return an access token for valid user credentials', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'password',
      role: 'user',
    };
    const token = 'access_token';

    usersService.findOne = jest.fn().mockResolvedValue(user);
    jwtService.signAsync = jest.fn().mockResolvedValue(token);

    const result = await authService.signIn(user.email, 'password');
    expect(result).toEqual({ access_token: token });
    expect(usersService.findOne).toHaveBeenCalledWith(user.email);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  });

  it('should throw UnauthorizedException for invalid user credentials', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'password',
      role: 'user',
    };

    usersService.findOne = jest.fn().mockResolvedValue(user);

    await expect(
      authService.signIn(user.email, 'wrongpassword'),
    ).rejects.toThrow(UnauthorizedException);
    expect(usersService.findOne).toHaveBeenCalledWith(user.email);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    usersService.findOne = jest.fn().mockResolvedValue(null);

    await expect(
      authService.signIn('nonexistent@example.com', 'password'),
    ).rejects.toThrow(UnauthorizedException);
    expect(usersService.findOne).toHaveBeenCalledWith(
      'nonexistent@example.com',
    );
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });
});
