import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(AppService.name);

  async getHello(): Promise<any> {
    const toto = {
      id: 1,
      email: 'toto@gmail.com',
      name: 'toto',
    };
    return toto;
  }
}
