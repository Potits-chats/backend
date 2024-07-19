import { Test, TestingModule } from '@nestjs/testing';
import { PusherService } from './pusher.service';

// Mock Pusher class
class PusherMock {
  trigger = jest.fn();
}

describe('PusherService', () => {
  let service: PusherService;
  let pusher: PusherMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PusherService,
        {
          provide: PusherMock,
          useClass: PusherMock,
        },
      ],
    }).compile();

    service = module.get<PusherService>(PusherService);
    pusher = module.get<PusherMock>(PusherMock);

    // Override the internal pusher instance with the mock
    (service as any).pusher = pusher;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call pusher.trigger with correct parameters', async () => {
    const channel = 'test-channel';
    const event = 'test-event';
    const data = { message: 'hello world' };

    await service.trigger(channel, event, data);

    expect(pusher.trigger).toHaveBeenCalledWith(channel, event, data);
  });
});
