import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { PrismaService } from '../utils/prisma.service';
import { PusherService } from '../pusher/pusher.service';
import { Utilisateurs } from '@prisma/client';

describe('MessagesService', () => {
  let service: MessagesService;
  let prisma: PrismaService;
  let pusher: PusherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: PrismaService,
          useValue: {
            messages: {
              create: jest.fn().mockResolvedValue({}),
              findMany: jest.fn().mockResolvedValue([]),
            },
            utilisateurs: {
              findMany: jest.fn().mockResolvedValue([]),
            },
            associations: {
              findMany: jest.fn().mockResolvedValue([]),
            },
          },
        },
        {
          provide: PusherService,
          useValue: {
            trigger: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    prisma = module.get<PrismaService>(PrismaService);
    pusher = module.get<PusherService>(PusherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should create a message and trigger pusher event', async () => {
      const userId = 1;
      const associationId = 2;
      const content = 'Hello';
      const user: Utilisateurs = {
        id: 1,
        email: 'test@test.com',
      } as Utilisateurs;

      await service.sendMessage(userId, associationId, content, user);
      expect(prisma.messages.create).toHaveBeenCalledWith({
        data: {
          contenu: content,
          utilisateursId: userId,
          associationsId: associationId,
          isUserSender: !user.associationId,
        },
      });
      expect(pusher.trigger).toHaveBeenCalledWith(
        `association-${associationId}-user-${userId}`,
        'new-message',
        {},
      );
    });
  });

  describe('getMessages', () => {
    it('should return messages for a user and association', async () => {
      const userId = 1;
      const associationId = 2;
      await service.getMessages(userId, associationId);
      expect(prisma.messages.findMany).toHaveBeenCalledWith({
        where: { utilisateursId: userId, associationsId: associationId },
        orderBy: { createdAt: 'asc' },
      });
    });
  });

  describe('getConversationsWithLastMessages', () => {
    it('should return sorted conversations with last messages for association user', async () => {
      const user: Utilisateurs = {
        id: 1,
        associationId: 1,
        email: 'test@test.com',
      } as Utilisateurs;

      const result = await service.getConversationsWithLastMessages(user);
      expect(prisma.utilisateurs.findMany).toHaveBeenCalledWith({
        where: {
          messages: {
            some: {
              associationsId: user.associationId,
            },
          },
        },
        include: {
          messages: {
            where: { associationsId: user.associationId },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      });

      expect(result).toEqual(expect.any(Array));
    });

    it('should return sorted conversations with last messages for individual user', async () => {
      const user: Utilisateurs = {
        id: 1,
        email: 'test@test.com',
      } as Utilisateurs;

      const result = await service.getConversationsWithLastMessages(user);
      expect(prisma.associations.findMany).toHaveBeenCalledWith({
        where: {
          messages: {
            some: {
              utilisateursId: user.id,
            },
          },
        },
        include: {
          messages: {
            where: { utilisateursId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          photos: true,
        },
      });

      expect(result).toEqual(expect.any(Array));
    });
  });
});
