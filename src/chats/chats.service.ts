import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Chats, PrismaClient } from '@prisma/client';

@Injectable()
export class ChatsService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(ChatsService.name);

  async findAll(options: {
    associationId?: number;
    take?: number;
    skip?: number;
  }) {
    const { associationId, take, skip } = options;

    let query = {
      include: {
        photos: true,
        association: true,
        favoris: {
          where: { utilisateurId: 1 }, // TODO CHANGER PAR L'ID DE L'UTILISATEUR CONNECTE
        },
      },
      where: {
        isVisible: true,
      },
    };
    if (associationId) {
      query = {
        ...query,
        where: {
          ...query.where,
          association: {
            id: associationId,
          },
        },
      } as typeof query & { where: { association: { id: number } } };
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

  async update(id: number, updateChatDto: Chats) {
    delete updateChatDto.id;
    delete updateChatDto.associationId;
    delete updateChatDto['association'];
    delete updateChatDto['photos'];
    delete updateChatDto['userId'];
    const chats = await this.prisma.chats.update({
      where: {
        id: id,
      },
      data: {
        ...updateChatDto,
      },
    });
    return chats;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
