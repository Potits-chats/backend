import {
  ForbiddenException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatsService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(ChatsService.name);

  findAll() {
    const chats = this.prisma.chats.findMany();
    return chats;
  }

  async findOne(id: number) {
    const chat = await this.prisma.chats.findUnique({
      where: {
        id: id,
      },
      include: {
        photos: true,
        association: true,
      },
    });
    if (!chat) {
      throw new NotFoundException();
    }
    return chat;
  }

  update(id: number) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
