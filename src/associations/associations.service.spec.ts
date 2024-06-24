import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsService } from './associations.service';

describe('AssociationsService', () => {
  let service: AssociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AssociationsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue([]),
            findAll: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue([]),
            remove: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<AssociationsService>(AssociationsService);
  });

  describe('findOne', () => {
    it('should return a single association', async () => {
      const result = {
        id: 1,
        nom: 'Name',
        url: '',
        ville: '',
        urlImage: '',
        description: '',
        tel: '',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await service.findOne(1)).toBe(result);
    });

    // Ajoutez ici d'autres cas de test si nécessaire
  });

  describe('findAll', () => {
    it('should return an array of associations', async () => {
      const result = [
        {
          id: 1,
          nom: 'Name',
          url: '',
          ville: '',
          urlImage: '',
          description: '',
          tel: '',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await service.findAll()).toBe(result);
    });

    // Ajoutez ici d'autres cas de test si nécessaire
  });

  describe('update', () => {
    it('should update an association successfully', async () => {
      const result = {
        id: 1,
        nom: 'New Name',
        url: '',
        ville: '',
        urlImage: '',
        description: '',
        tel: '',
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(
        await service.update(1, {
          id: 1,
          nom: 'New Name',
          url: '',
          ville: '',
          urlImage: '',
          description: '',
          tel: '',
        }),
      ).toBe(result);
    });

    // Ajoutez ici d'autres cas de test si nécessaire
  });

  describe('remove', () => {
    it('should remove a association', async () => {
      const result = {};
      jest.spyOn(service, 'remove').mockResolvedValue(result as never);
      expect(await service.remove(1)).toBe(result);
    });

    // Ajoutez ici d'autres cas de test si nécessaire
  });
});
