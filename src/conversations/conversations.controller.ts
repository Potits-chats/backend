import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { PusherService } from '../pusher/pusher.service';
import { ApiBody, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { ConversationsService } from './conversations.service';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly pusherService: PusherService,
    private conversationsService: ConversationsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a message' })
  @ApiResponse({ status: 200, description: 'Message sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiBody({ type: CreateMessageDto })
  async sendMessage(@Body() sendMessageDto: CreateMessageDto) {
    await this.pusherService.trigger('chat', 'message', {
      username: sendMessageDto.username,
      message: sendMessageDto.message,
    });
    return [];
  }
}
