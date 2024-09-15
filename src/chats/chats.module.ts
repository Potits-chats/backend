import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { PrismaModule } from '../utils/prisma.module';
import { WebhookService } from '../utils/webhook.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, WebhookService],
  imports: [PrismaModule, HttpModule],
})
export class ChatsModule {}
