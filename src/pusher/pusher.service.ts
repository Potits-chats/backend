import * as Pusher from 'pusher';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID || '',
      key: process.env.PUSHER_KEY || '',
      secret: process.env.PUSHER_SECRET || '',
      cluster: process.env.PUSHER_CLUSTER || 'eu',
      useTLS: true,
    });
  }

  trigger(channel: string, event: string, data: any) {
    return this.pusher.trigger(channel, event, data);
  }
}
// function Injectables(): (
//   target: typeof PusherService,
//   context: ClassDecoratorContext<typeof PusherService>,
// ) => void | typeof PusherService {
//   throw new Error('Function not implemented.');
// }
