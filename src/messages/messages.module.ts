import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from '../utils/prisma.module';
import { PusherService } from '../pusher/pusher.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PusherService],
  imports: [PrismaModule],
  exports: [MessagesService],
})
export class MessagesModule {}
