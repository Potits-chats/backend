import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Chats, Utilisateurs } from '@prisma/client';
import * as cheerio from 'cheerio';
import { PrismaService } from '../utils/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(ChatsService.name);

  async findAll(options: {
    associationId?: number;
    take?: number;
    skip?: number;
    ville?: string;
    race?: string;
  }) {
    const { associationId, take, skip, ville, race } = options;

    const query: any = {
      include: {
        photos: true,
        association: true,
      },
      where: {
        isVisible: true,
      },
    };

    if (associationId) {
      query.where = {
        ...query.where,
        association: {
          id: associationId,
        },
      };
    }

    if (ville) {
      query.where = {
        ...query.where,
        association: {
          ...query.where.association,
          ville: {
            contains: ville,
            mode: 'insensitive',
          },
        },
      };
    }

    if (race) {
      query.where = {
        ...query.where,
        race: {
          contains: race,
          mode: 'insensitive',
        },
      };
    }

    if (take) {
      query.take = take;
    }

    if (skip) {
      query.skip = skip;
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

  async findByFavoris(user: Utilisateurs) {
    const chats = await this.prisma.chats.findMany({
      where: {
        favoris: {
          some: {
            utilisateurId: user.id,
          },
        },
      },
      include: {
        photos: true,
        association: true,
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

  async update(id: number, updateChatDto: Chats) {
    delete updateChatDto.id;
    delete updateChatDto.associationId;
    delete updateChatDto['association'];
    delete updateChatDto['photos'];
    delete updateChatDto['userId'];
    delete updateChatDto['isFavori'];
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
