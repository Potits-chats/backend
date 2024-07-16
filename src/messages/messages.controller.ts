import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../utils/user.decorator';
import { Utilisateurs } from '@prisma/client';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @Post()
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.sendMessage(
      createMessageDto.userId,
      createMessageDto.associationId,
      createMessageDto.content,
      createMessageDto.isUserSender,
    );
  }

  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @Get(':associationId/:userId')
  async getMessagesUser(
    @Param('associationId') associationId: number,
    @Param('userId') userId: number,
  ) {
    return this.messagesService.getMessages(+userId, +associationId);
  }

  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @Get('conversations')
  async getConversationsWithLastMessages(@User() user: Utilisateurs) {
    return this.messagesService.getConversationsWithLastMessages(user);
  }
}
