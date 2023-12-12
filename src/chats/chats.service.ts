import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatsService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(ChatsService.name);

  async findAll() {
    const chats = this.prisma.chats.findMany({
      include: {
        photos: true,
        association: true,
      },
    });

    // Truncate the size of the description for each chat
    const truncatedChats = (await chats).map((chat) => {
      // Adjust the desired length for the truncated description
      const maxDescriptionLength = 130;

      // Check if the description length exceeds the maximum length
      if (chat.description && chat.description.length > maxDescriptionLength) {
        // Truncate the description and append '...' at the end
        chat.description =
          chat.description.slice(0, maxDescriptionLength) + '...';
      }

      return chat;
    });

    return truncatedChats;
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
