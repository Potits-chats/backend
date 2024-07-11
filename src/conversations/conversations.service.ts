import { Injectable, Logger } from '@nestjs/common';
import { PusherService } from '../pusher/pusher.service';

@Injectable()
export class ConversationsService {
  private readonly logger = new Logger(ConversationsService.name);

  constructor(private readonly pusherService: PusherService) {}

  async sendMessage(channel: string, message: string): Promise<void> {
    await this.pusherService.trigger(channel, 'my-event', { message });
  }
}
