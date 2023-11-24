import { SetMetadata } from '@nestjs/common';
export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);

export enum Role {
  User = 'user',
  Admin = 'admin',
}
