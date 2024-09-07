import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../utils/prisma.service';
import {
  CreateAssociationDto,
  UpdateAssociationDto,
} from './dto/associations.dto';
import { WebhookService } from '../utils/webhook.service';

@Injectable()
export class AssociationsService {
  constructor(
    private prisma: PrismaService,
    private readonly webhookService: WebhookService,
  ) {}
  private readonly logger = new Logger(AssociationsService.name);

  async findAll() {
    const associations = await this.prisma.associations.findMany({
      where: {
        isVisible: true,
      },
      include: {
        chats: true,
        photos: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return associations;
  }

  async findOne(id: number) {
    const association = await this.prisma.associations.findUnique({
      where: {
        id: id,
        isVisible: true,
      },
      include: {
        photos: true,
        chats: true,
      },
    });
    console.log(association);
    if (!association) {
      throw new NotFoundException();
    }
    return association;
  }

  async update(id: number, updateAssoDto: UpdateAssociationDto) {
    const associations = await this.prisma.associations.update({
      where: {
        id: id,
      },
      data: {
        nom: updateAssoDto.nom,
        url: updateAssoDto.url,
        ville: updateAssoDto.ville,
        description: updateAssoDto.description,
        shortDescription: updateAssoDto.shortDescription,
        tel: updateAssoDto.tel,
      },
    });
    return associations;
  }

  async create(createAssoDto: CreateAssociationDto) {
    const association = await this.prisma.associations.create({
      data: {
        nom: createAssoDto.nom,
        url: createAssoDto.url,
        ville: createAssoDto.ville,
        description: createAssoDto.description,
        shortDescription: createAssoDto.shortDescription,
        tel: createAssoDto.tel,
        isVisible: false,
      },
    });
    const message = `Une nouvelle association a été créée: **${association.nom}** à **${association.ville}**.\n\nDescription courte : ${association.shortDescription}.\n\nLien : ${association.url}.\n\n Merci de vérifier les informations et de la rendre visible.`;
    await this.webhookService.sendMessage(message);

    return association;
  }

  remove(id: number) {
    return `This action removes a #${id} association`;
  }
}
