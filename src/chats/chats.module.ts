import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { PrismaModule } from '../utils/prisma.module';
import { WebhookService } from '../utils/webhook.service';
import { HttpModule } from '@nestjs/axios';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, WebhookService, FilesService],
  imports: [PrismaModule, HttpModule],
})
export class ChatsModule {}
