import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../utils/user.decorator';
import { Utilisateurs } from '@prisma/client';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @Post(':id/messages')
  async sendMessage(
    @Param('id') conversationId: number,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.conversationsService.sendMessage(
      conversationId,
      createMessageDto.userId,
      createMessageDto.content,
    );
  }

  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @Get(':id/messages')
  async getMessages(
    @Param('id') conversationId: number,
    @User() user: Utilisateurs,
  ) {
    return this.conversationsService.getMessages(conversationId, user.id);
  }

  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @Get('user/:userId')
  async getConversationsForUser(@Param('userId') userId: number) {
    return this.conversationsService.getConversationsForUser(userId);
  }
}
