import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

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
    return this.conversationsService.createMessage(
      messageDto.contenu,
      messageDto.utilisateursId,
      messageDto.conversationsId,
      messageDto.associationId,
    );
  }

  @Post('')
  createConversation(
    @Body() conversation: { utilisateurId: number; associationId: number },
  ) {
    return this.conversationsService.createConversation(
      conversation.associationId,
      conversation.utilisateurId,
    );
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
