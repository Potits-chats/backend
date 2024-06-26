import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient, Utilisateurs } from '@prisma/client';

@Injectable()
export class FavorisService {
  static mockImplementation() {
    throw new Error('Method not implemented.');
  }
  prisma = new PrismaClient();
  private readonly logger = new Logger(FavorisService.name);

  create(
    favori: {
      id?: number;
      createdAt?: string;
      chatId: number;
    },
    user: Utilisateurs,
  ) {
    return this.prisma.favoris.create({
      data: {
        chatId: favori.chatId,
        utilisateurId: user.id,
      },
    });
  }

  findAll() {
    return this.prisma.favoris.findMany();
  }

  findByUser(user: Utilisateurs, take: number) {
    console.log(take);
    return this.prisma.favoris
      .findMany({
        where: { utilisateurId: user.id },
        select: { chatId: true },
        distinct: ['chatId'],
      })
      .then((favoris) => favoris.map((favori) => favori.chatId));
  }

  removeByCat(id: number, user: Utilisateurs) {
    return this.prisma.favoris.deleteMany({
      where: {
        chatId: id,
        utilisateurId: user.id,
      },
    });
  }
}
