import { Test, TestingModule } from '@nestjs/testing';
import { ChatsService } from './chats.service';
import { Sexe, Taille } from '@prisma/client';

describe('ChatsService', () => {
  let service: ChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ChatsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ChatsService>(ChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all chats', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await service.findAll({})).toBe(result);
  });

  it('should find one chat', async () => {
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
        description: '',
        shortDescription: '',
        tel: '',
        urlGoogleMapsEmbled: '',
        isVisible: false,
      },
      photos: [
        { id: 1, createdAt: undefined, url: '', chatId: 1, associationId: 1 },
      ],
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await service.findOne(1)).toBe(result);
  });

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
        description: '',
        shortDescription: '',
        tel: '',
      },
      photos: [
        { id: 1, createdAt: undefined, url: '', chatId: 1, associationId: 1 },
      ],
    };
    jest.spyOn(service, 'update').mockResolvedValue(result);
    expect(await service.update(1, result)).toBe(result);
  });

  it('should remove a chat', async () => {
    const result = {};
    jest.spyOn(service, 'remove').mockResolvedValue(result as never);
    expect(await service.remove(1)).toBe(result);
  });
});
