import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { PusherService } from '../pusher/pusher.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly pusherService: PusherService,
  ) {}

  // @UseGuards(AuthorizationGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une conversation' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        utilisateurId: { type: 'number' },
        associationId: { type: 'number' },
      },
    },
  })

  // @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Créer un message' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        contenu: { type: 'string' },
        utilisateursId: { type: 'number' },
        associationId: { type: 'number', nullable: true },
        conversationsId: { type: 'number', nullable: true }, // Rendu optionnel ici
      },
    },
  })
  @Post('messages')
  async createMessage(
    @Body()
    messageDto: {
      contenu: string;
      utilisateursId: number;
      associationId?: number;
      conversationsId?: number;
    },
  ) {
    const createdMessage = await this.conversationsService.createMessage(
      messageDto.contenu,
      messageDto.utilisateursId,
      messageDto.conversationsId,
      messageDto.associationId,
    );

    // Envoyer un message à Pusher pour notifier la création d'un message
    this.pusherService.trigger('conversation', 'new-message', {
      message: createdMessage,
    });

    return createdMessage;
  }

  @Post('')
  createConversation(
    @Body() conversation: { utilisateurId: number; associationId: number },
  ) {
    const newConversation = this.conversationsService.createConversation(
      conversation.associationId,
      conversation.utilisateurId,
    );

    // Envoyer une notification à Pusher pour informer de la nouvelle conversation
    this.pusherService.trigger('conversation', 'new-conversation', {
      conversation: newConversation,
    });

    return newConversation;
  }

  // @UseGuards(AuthorizationGuard)
  // @ApiBearerAuth()
  @Get()
  findAll() {
    return this.conversationsService.findAllByUser(1);
  }

  // @UseGuards(AuthorizationGuard)
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationsService.findOne(+id);
  }
}
