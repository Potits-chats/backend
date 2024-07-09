import { Injectable, Logger } from '@nestjs/common';
import { Conversations, Messages, PrismaClient } from '@prisma/client';
import { PusherService } from 'src/pusher/pusher.service';

@Injectable()
export class ConversationsService {
  prisma = new PrismaClient();
  private readonly logger = new Logger(ConversationsService.name);

  constructor(private readonly pusherService: PusherService) {}

  private emitEvent(eventType: string, data: any) {
    try {
      this.pusherService.trigger('conversation', eventType, data);
    } catch (error) {
      this.logger.error(`Failed to emit ${eventType} event`, error.stack);
    }
  }

  async createConversation(
    utilisateurId: number,
    associationId: number,
  ): Promise<Conversations> {
    let conversation = await this.prisma.conversations.findFirst({
      where: {
        utilisateursId: utilisateurId,
        associationsId: associationId,
      },
    });
    if (!conversation) {
      conversation = await this.prisma.conversations.create({
        data: {
          utilisateursId: utilisateurId,
          associationsId: associationId,
        },
      });
      this.emitEvent('new-conversation', { conversationId: conversation.id });
    }
    return conversation;
  }

  async createMessage(
    contenu: string,
    utilisateursId: number,
    conversationsId?: number,
    associationId?: number,
  ): Promise<Messages> {
    let conversationId = conversationsId;

    // Si aucun ID de conversation n'est fourni, créez une nouvelle conversation
    if (!conversationId) {
      const conversation = await this.createConversation(
        utilisateursId,
        associationId,
      );
      conversationId = conversation.id;
    }

    const message = await this.prisma.messages.create({
      data: {
        contenu,
        utilisateursId,
        conversationsId: conversationId,
      },
    });
    this.emitEvent('new-message', { messageId: message.id, conversationId });
    return message;
  }

  findAllByUser(userid: number) {
    return this.prisma.conversations.findMany({
      where: {
        utilisateur: {
          id: userid,
        },
      },
      include: {
        association: true,
        _count: {
          select: { messages: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.conversations.findUnique({
      where: {
        id: id,
      },
      include: {
        messages: true,
        association: true,
        utilisateur: true,
      },
    });
  }

  // update(id: number, updateConversationDto: UpdateConversationDto) {
  //   return `This action updates a #${id} conversation`;
  // }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
