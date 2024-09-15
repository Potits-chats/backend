import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Chats, Utilisateurs } from '@prisma/client';
import * as cheerio from 'cheerio';
import { PrismaService } from '../utils/prisma.service';
import { CreateCatDto } from './dto/chats.dto';
import { WebhookService } from '../utils/webhook.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class ChatsService {
  constructor(
    private prisma: PrismaService,
    private readonly webhookService: WebhookService,
    private filesService: FilesService,
  ) {}

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
          contains: race.replace('-', ' '),
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

  async update(
    id: number,
    updateChatDto: Chats,
    photos: Express.Multer.File[],
  ) {
    const photoUrls = photos
      ? await Promise.all(
          photos.map((photo) => this.filesService.uploadFile(photo)),
        )
      : [];

    const updateData: any = {
      ...updateChatDto,
    };

    if (photoUrls.length > 0) {
      updateData.photos = {
        create: photoUrls.map((url) => ({ url })),
      };
    }

    await this.prisma.photos.createMany({
      data: photoUrls.map((url) => ({
        url,
        chatId: updateChatDto.id,
      })),
    });

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

  async create(
    createChatDto: CreateCatDto,
    photos: Express.Multer.File[],
    user: Utilisateurs,
  ) {
    const photoUrls = await Promise.all(
      photos.map((photo) => this.filesService.uploadFile(photo)),
    );

    const chat = await this.prisma.chats.create({
      data: {
        ...createChatDto,
        association: {
          connect: {
            id: user.associationId,
          },
        },
      },
    });

    await this.prisma.photos.createMany({
      data: photoUrls.map((url) => ({
        url,
        chatId: chat.id,
      })),
    });

    this.logger.log('Chat créer : ', chat);
    this.webhookService.sendMessage(
      'Un nouveau chat a été ajouté ! ' + chat.id + ' ' + chat.nom,
    );
    return chat;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
