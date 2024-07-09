import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { PrismaModule } from '../utils/prisma.module';
import { PusherService } from '../pusher/pusher.service';

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService, PusherService],
  imports: [PrismaModule],
  exports: [ConversationsService],
})
export class ConversationsModule {}
