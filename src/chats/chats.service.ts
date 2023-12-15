import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatsService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(ChatsService.name);

  async findAll(options: {
    associationName?: string;
    take?: number;
    skip?: number;
  }) {
    const { associationName, take, skip } = options;

    let query = {
      include: {
        photos: true,
        association: true,
      },
      where: {},
    };

    if (associationName) {
      query = {
        ...query,
        where: {
          association: {
            name: associationName,
          },
        },
      };
    }

    if (take) {
      query = {
        ...query,
        take,
      } as typeof query & { take: number };
    }

    if (skip) {
      query = {
        ...query,
        skip,
      } as typeof query & { skip: number };
    }

    const chats = await this.prisma.chats.findMany({
      ...query,
      orderBy: {
        id: 'desc', // Sort chats by id in descending order
      },
      where: {
        isVisible: true, // Add the isVisible filter
      },
    });

    const truncatedChats = chats.map((chat) => {
      const maxDescriptionLength = 130;

      if (chat.description && chat.description.length > maxDescriptionLength) {
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
        isVisible: true,
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
