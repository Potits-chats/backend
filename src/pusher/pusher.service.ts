import * as Pusher from 'pusher';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: process.env.APP_ID_PUSHER,
      key: process.env.KEY_PUSHER,
      secret: process.env.SECRET_PUSHER,
      cluster: process.env.CLUSTER_PUSHER || 'eu',
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: object): Promise<void> {
    try {
      await this.pusher.trigger(channel, event, data);
    } catch (error) {
      console.error('Error triggering Pusher event: ', error);
      throw error;
    }
  }
}
