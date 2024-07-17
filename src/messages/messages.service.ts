import { Injectable } from '@nestjs/common';
import { PusherService } from '../pusher/pusher.service';
import { PrismaService } from '../utils/prisma.service';
import { Utilisateurs } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pusherService: PusherService,
  ) {}

  async sendMessage(
    userId: number,
    associationId: number,
    content: string,
    user: Utilisateurs,
  ) {
    const message = await this.prisma.messages.create({
      data: {
        contenu: content,
        utilisateursId: userId,
        associationsId: associationId,
        isUserSender: user.associationId ? false : true,
      },
    });

    await this.pusherService.trigger(
      `association-${associationId}-user-${userId}`,
      'new-message',
      message,
    );

    return message;
  }

  async getMessages(userId: number, associationId: number) {
    console.log('userId:', userId);
    console.log('associationId:', associationId);
    const messages = await this.prisma.messages.findMany({
      where: { utilisateursId: +userId, associationsId: +associationId },
      orderBy: { createdAt: 'asc' },
    });
    return messages;
  }

  // Nouvelle méthode pour récupérer les conversations et leurs derniers messages
  async getConversationsWithLastMessages(user: Utilisateurs) {
    // isAssociation
    if (user.associationId) {
      const utilisateurs = await this.prisma.utilisateurs.findMany({
        where: {
          messages: {
            some: {
              associationsId: user.associationId,
            },
          },
        },
        include: {
          messages: {
            where: { associationsId: user.associationId },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      });
      return utilisateurs;
    } else {
      const associations = await this.prisma.associations.findMany({
        where: {
          messages: {
            some: {
              utilisateursId: user.id,
            },
          },
        },
        include: {
          messages: {
            where: { utilisateursId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          photos: true,
        },
      });

      return associations;
    }
  }
}
