import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../utils/prisma.service';
import { UpdateAssociationDto } from './dto/associations.dto';

@Injectable()
export class AssociationsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(AssociationsService.name);

  async findAll() {
    const associations = await this.prisma.associations.findMany({
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
      },
      include: {
        photos: true,
        chats: true,
      },
    });
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

  remove(id: number) {
    return `This action removes a #${id} association`;
  }
}
