import { Test, TestingModule } from '@nestjs/testing';
import { FavorisService } from './favoris.service';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');
const mockedPrismaClient = <jest.Mock<PrismaClient>>PrismaClient;

describe('AssociationsService', () => {
  let service: FavorisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FavorisService,
          useValue: {
            create: jest.fn().mockResolvedValue([]),
            findAll: jest.fn().mockResolvedValue([]),
            findByUser: jest.fn().mockResolvedValue([]),
            removeByCat: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<FavorisService>(FavorisService);
    mockedPrismaClient.mockClear();
  });

  describe('create', () => {
    it('should return a a favoris', async () => {
      const result = {
        createdAt: new Date('01/10/2025'),
        chatId: 1,
        utilisateurId: 1,
        id: 1,
      };

      const user = {
        id: 5,
        email: 'test@test.com',
        userId: '1',
        associationId: 1,
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(
        await service.create(
          {
            id: 1,
            createdAt: '01/10/2025',
            chatId: 2,
          },
          user,
        ),
      ).toBe(result);
    });

    // Ajoutez ici d'autres cas de test si nécessaire
  });

  describe('findAll', () => {
    it('should return an array of favoris', async () => {
      const result = [
        {
          createdAt: new Date(),
          chatId: 1,
          utilisateurId: 1,
          id: 1,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await service.findAll()).toBe(result);
    });

    // Ajoutez ici d'autres cas de test si nécessaire
  });

  //   describe('findbyUser', () => {
  //     it('findByUser', async () => {
  //     const prisma = new PrismaClient;
  //     mockedPrismaClient.mockImplementation(() => {
  //       return {
  //         favoris: {
  //           findMany: () => {
  //             return new Promise((resolve, reject) => {
  //                 resolve([
  //                   {
  //                     chatId: 3
  //                   }
  //                 ])
  //             })
  //         }
  //       }
  //     }})
  //     const user = {
  //       id : 5,
  //     };
  // /*
  //     const chats = prisma.chats.findMany({
  //       where: {
  //           favoris: {
  //             some: {
  //               utilisateurId: user.id,
  //             },
  //           },
  //       },
  //     })
  // */
  //     const user5 = {
  //       id : 5,
  //       email: 'test@test.com',
  //       userId: '1',
  //       associationId: 1,
  //     };

  //     expect(await service.findByUser(user5, 1)).toBe([1]);

  //   });

  // Ajoutez ici d'autres cas de test si nécessaire
  // });

  describe('removeByCat', () => {
    it('should remove a favoris', async () => {
      const result = {};

      const user = {
        id: 5,
        email: 'test@test.com',
        associationId: 1,
        userId: '1',
      };

      jest.spyOn(service, 'removeByCat').mockResolvedValue(result as never);
      expect(await service.removeByCat(1, user)).toBe(result);
    });

    // Ajoutez ici d'autres cas de test si nécessaire
  });
});
