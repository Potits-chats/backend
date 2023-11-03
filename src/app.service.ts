import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(AppService.name);

  async getHello(): Promise<any> {
    const result = await this.prisma.chats.findMany();
    return result;
  }
}
