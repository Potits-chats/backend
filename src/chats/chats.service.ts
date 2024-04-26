import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Chats, PrismaClient, Utilisateurs } from '@prisma/client';
import * as cheerio from 'cheerio';

@Injectable()
export class ChatsService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(ChatsService.name);

  async findAll(options: {
    user?: Utilisateurs;
    associationId?: number;
    take?: number;
    skip?: number;
  }) {
    const { user, associationId, take, skip } = options;

    let query: any = {
      include: {
        photos: true,
        association: true,
      },
      where: {
        isVisible: true,
      },
    };

    if (user) {
      query.include = {
        ...query.include,
        favoris: {
          where: { utilisateurId: user.id },
        },
      };
    }

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

    const truncatedChats = chats.map((chat: Chats) => {
      const maxDescriptionLength = 130;

      if (chat.description && chat.description.length > maxDescriptionLength) {
        const $ = cheerio.load(chat.description);
        const textWithoutHtml = $.text().slice(0, maxDescriptionLength) + '...';
        chat.description = textWithoutHtml;
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
