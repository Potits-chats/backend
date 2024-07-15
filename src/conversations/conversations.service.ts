import { Injectable } from '@nestjs/common';
import { PusherService } from '../pusher/pusher.service';
import { PrismaService } from '../utils/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pusherService: PusherService,
  ) {}

  async sendMessage(conversationId: number, userId: number, content: string) {
    const message = await this.prisma.messages.create({
      data: {
        contenu: content,
        utilisateursId: +userId,
        conversationsId: +conversationId,
      },
    });

    await this.pusherService.trigger(
      `conversation-${conversationId}`,
      'new-message',
      message,
    );

    return message;
  }

  async getMessages(conversationId: number, userId: number) {
    const messages = await this.prisma.messages.findMany({
      where: { conversationsId: +conversationId },
      orderBy: { createdAt: 'asc' },
    });

    return messages.map((message) => ({
      ...message,
      isAuthor: message.utilisateursId === userId,
    }));
  }

  async getConversationsForUser(userId: number) {
    return this.prisma.conversations.findMany({
      where: { utilisateursId: userId },
      include: { messages: true, association: true, utilisateur: true },
    });
  }
}
