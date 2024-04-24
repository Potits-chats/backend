import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(UsersService.name);

  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //     roles: ['admin'],
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //     roles: ['user'],
  //   },
  // ];

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.utilisateurs.findUnique({
      where: {
        email: email,
      },
    });
  }
  async findOneById(id: number): Promise<User | undefined> {
    return this.prisma.utilisateurs.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<User | undefined> {
    return this.prisma.utilisateurs.findMany();
  }

  async create(createUserDto: any): Promise<User> {
    this.logger.log(`createUserDto: ${JSON.stringify(createUserDto)}`);
    return this.prisma.utilisateurs.create({
      data: {
        email: createUserDto.email,
        userId: createUserDto.userId,
      },
    });
  }
}
