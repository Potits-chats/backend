import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FavorisService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(FavorisService.name);

  create(favori: {
    id?: number;
    createdAt?: string;
    chatId: number;
    utilisateurId: number;
  }) {
    return this.prisma.favoris.create({
      data: {
        chatId: favori.chatId,
        utilisateurId: favori.utilisateurId,
      },
    });
  }

  findAll() {
    return this.prisma.favoris.findMany();
  }

  findOne(id: number) {
    return this.prisma.favoris.findUnique({
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.prisma.favoris.delete({
      where: { id: id },
    });
  }
}
