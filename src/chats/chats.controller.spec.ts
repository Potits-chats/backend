import { Test, TestingModule } from '@nestjs/testing';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { Sexe, Taille } from '@prisma/client';

describe('ChatsController', () => {
  let controller: ChatsController;
  let service: ChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatsController],
      providers: [
        {
          provide: ChatsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findByFavoris: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ChatsController>(ChatsController);
    service = module.get<ChatsService>(ChatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of chats', async () => {
      expect(await controller.findAll()).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should get a chat', async () => {
      const result = {
        id: 0,
        nom: '',
        age: 0,
        automatiqueAnnonce: false,
        description: '',
        race: '',
        annonceUrl: '',
        sterilise: false,
        vaccinations: '',
        adopte: false,
        histoire: '',
        type: '',
        sexe: Sexe.FEMELLE,
        couleur: '',
        taille: Taille.PETIT,
        ententeChien: false,
        ententeChat: false,
        ententeEnfant: false,
        typeFoyerMaison: false,
        typeFoyerAppartement: false,
        contactEmail: '',
        contactTel: '',
        contactUrl: '',
        createdAt: undefined,
        updatedAt: undefined,
        associationId: 0,
        isVisible: false,
        association: {
          id: 1,
          nom: '',
          url: '',
          ville: '',
          urlImage: '',
          description: '',
          shortDescription: '',
          tel: '',
          email: '',
          createdAt: undefined,
          updatedAt: undefined,
          chats: [],
        },
        photos: [
          { id: 1, createdAt: undefined, url: '', chatId: 1, associationId: 1 },
        ],
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('findByFavoris', () => {
    it('should find chats by favoris', async () => {
      const result = [];
      const user = { id: 1, email: '', userId: '1', associationId: 1 };
      jest.spyOn(service, 'findByFavoris').mockResolvedValue(result);
      expect(await controller.findByFavoris(user)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a chat', async () => {
      const result = {
        id: 0,
        nom: '',
        age: 0,
        automatiqueAnnonce: false,
        description: '',
        race: '',
        annonceUrl: '',
        sterilise: false,
        vaccinations: '',
        adopte: false,
        histoire: '',
        type: '',
        sexe: Sexe.FEMELLE,
        couleur: '',
        taille: Taille.PETIT,
        ententeChien: false,
        ententeChat: false,
        ententeEnfant: false,
        typeFoyerMaison: false,
        typeFoyerAppartement: false,
        contactEmail: '',
        contactTel: '',
        contactUrl: '',
        createdAt: undefined,
        updatedAt: undefined,
        associationId: 0,
        isVisible: false,
        association: {
          id: 1,
          nom: '',
          url: '',
          ville: '',
          urlImage: '',
          description: '',
          shortDescription: '',
          tel: '',
          email: '',
          createdAt: undefined,
          updatedAt: undefined,
          chats: [],
        },
        photos: [
          { id: 1, createdAt: undefined, url: '', chatId: 1, associationId: 1 },
        ],
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(
        await controller.update('1', {
          id: 0,
          nom: '',
          age: 0,
          automatiqueAnnonce: false,
          description: '',
          race: '',
          annonceUrl: '',
          sterilise: false,
          vaccinations: '',
          adopte: false,
          histoire: '',
          type: '',
          sexe: 'FEMELLE',
          couleur: '',
          taille: 'PETIT',
          ententeChien: false,
          ententeChat: false,
          ententeEnfant: false,
          typeFoyerMaison: false,
          typeFoyerAppartement: false,
          contactEmail: '',
          contactTel: '',
          contactUrl: '',
          createdAt: undefined,
          updatedAt: undefined,
          associationId: 0,
          isVisible: false,
        }),
      ).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a chat', async () => {
      const result = {};
      jest.spyOn(service, 'remove').mockResolvedValue(result as never);
      expect(await controller.remove('1')).toBe(result);
    });
  });
});
