import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { Utilisateurs } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: {
            sendMessage: jest.fn().mockResolvedValue({}),
            getMessages: jest.fn().mockResolvedValue([]),
            getConversationsWithLastMessages: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    })
      .overrideGuard(AuthorizationGuard)
      .useValue({})
      .compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should call messagesService.sendMessage', async () => {
      const createMessageDto: CreateMessageDto = {
        userId: 1,
        associationId: 2,
        content: 'Hello',
        isUserSender: true,
      };
      const user: Utilisateurs = {
        id: 1,
        email: 'test@test.com',
      } as Utilisateurs;
      await controller.sendMessage(createMessageDto, user);
      expect(service.sendMessage).toHaveBeenCalledWith(
        createMessageDto.userId,
        createMessageDto.associationId,
        createMessageDto.content,
        user,
      );
    });
  });

  describe('getMessagesUser', () => {
    it('should call messagesService.getMessages', async () => {
      const userId = 1;
      const associationId = 2;
      await controller.getMessagesUser(associationId, userId);
      expect(service.getMessages).toHaveBeenCalledWith(userId, associationId);
    });
  });

  describe('getConversationsWithLastMessages', () => {
    it('should call messagesService.getConversationsWithLastMessages', async () => {
      const user: Utilisateurs = {
        id: 1,
        email: 'test@test.com',
      } as Utilisateurs;
      await controller.getConversationsWithLastMessages(user);
      expect(service.getConversationsWithLastMessages).toHaveBeenCalledWith(
        user,
      );
    });
  });
});
