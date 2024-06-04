import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Associations, PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

@Injectable()
export class AssociationsService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(AssociationsService.name);

  async findAll(options: { chatId?: number; take?: number; skip?: number }) {
    const { chatId, take, skip } = options;

    let query = {
      include: {
        photos: true,
        chat: true,
        favoris: {
          where: { utilisateurId: 1 }, // TODO CHANGER PAR L'ID DE L'UTILISATEUR CONNECTE
        },
      },
      where: {
        isVisible: true,
      },
    };
    if (chatId) {
      query = {
        ...query,
        where: {
          ...query.where,
          chat: {
            id: chatId,
          },
        },
      } as typeof query & { where: { chat: { id: number } } };
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

    const associations = await this.prisma.associations.findMany({
      ...query,
      orderBy: {
        id: 'desc', // Sort associations by id in descending order
      },
    });

    const truncatedAsso = associations.map((association: Associations) => {
      const maxDescriptionLength = 130;

      if (
        association.description &&
        association.description.length > maxDescriptionLength
      ) {
        const $ = cheerio.load(association.description);
        const textWithoutHtml = $.text().slice(0, maxDescriptionLength) + '...';
        association.description = textWithoutHtml;
      }
      return association;
    });
    return truncatedAsso;
  }

  async findOne(id: number) {
    const association = await this.prisma.associations.findUnique({
      where: {
        id: id,
        isVisible: true,
      },
      include: {
        photos: true,
        chat: true,
      },
    });
    if (!association) {
      throw new NotFoundException();
    }
    return association;
  }

  async update(id: number, updateAssoDto: Associations) {
    delete updateAssoDto.id;
    delete updateAssoDto.chatId;
    delete updateAssoDto['chat'];
    delete updateAssoDto['photos'];
    delete updateAssoDto['userId'];
    const associations = await this.prisma.associations.update({
      where: {
        id: id,
      },
      data: {
        ...updateAssoDto,
      },
    });
    return associations;
  }

  remove(id: number) {
    return `This action removes a #${id} association`;
  }
}
