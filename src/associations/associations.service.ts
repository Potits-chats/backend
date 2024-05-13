import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Associations, PrismaClient } from '@prisma/client';

@Injectable()
export class AssociationsService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(AssociationsService.name);

  async findAll() {
    const associations = await this.prisma.associations.findMany();
    return associations;
  }

  async findOne(id: number) {
    const association = await this.prisma.associations.findUnique({
      where: {
        id: id,
      },
    });
    if (!association) {
      throw new NotFoundException();
    }
    return association;
  }

  async update(id: number, updateAssoDto: Associations) {
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
