import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { PusherService } from '../pusher/pusher.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';

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
  @UsePipes(new ValidationPipe({ transform: true }))
  async createMessage(@Body() messageDto: CreateMessageDto) {
    try {
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
    } catch (error) {
      throw new HttpException(
        'Failed to create message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('')
  async createConversation(
    @Body() conversation: { utilisateurId: number; associationId: number },
  ) {
    try {
      const newConversation =
        await this.conversationsService.createConversation(
          conversation.associationId,
          conversation.utilisateurId,
        );

      // Envoyer une notification à Pusher pour informer de la nouvelle conversation
      this.pusherService.trigger('conversation', 'new-conversation', {
        conversation: newConversation,
      });

      return newConversation;
    } catch (error) {
      throw new HttpException(
        'Failed to create conversation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @UseGuards(AuthorizationGuard)
  // @ApiBearerAuth()
  @Get()
  async findAll() {
    try {
      return await this.conversationsService.findAllByUser(1);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch conversations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @UseGuards(AuthorizationGuard)
  // @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const conversation = await this.conversationsService.findOne(+id);
      if (!conversation) {
        throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
      }
      return conversation;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch conversation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
