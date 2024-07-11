import { Injectable } from '@nestjs/common';
import Pusher from 'pusher';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: process.env.APP_ID_PUSHER,
      key: process.env.KEY_PUSHER,
      secret: process.env.SECRET_PUSHER,
      cluster: process.env.CLUSTER_PUSHER,
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any): Promise<void> {
    await this.pusher.trigger(channel, event, data);
  }
}
