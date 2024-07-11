import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';

describe('AssociationsController', () => {
  let controller: AssociationsController;
  let service: AssociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationsController],
      providers: [
        {
          provide: AssociationsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<AssociationsController>(AssociationsController);
    service = module.get<AssociationsService>(AssociationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of associations', async () => {
      expect(await controller.findAll()).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should get an association', async () => {
      const result = {
        id: 0,
        nom: '',
        url: '',
        ville: '',
        description: '',
        shortDescription: '',
        tel: '',
        chats: [],
        photos: [],
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an association', async () => {
      const result = {
        id: 0,
        nom: '',
        url: '',
        ville: '',
        description: '',
        shortDescription: '',
        tel: '',
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(
        await controller.update('1', {
          nom: '',
          url: '',
          ville: '',
          description: '',
          shortDescription: '',
          tel: '',
        }),
      ).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete an association', async () => {
      const result = {};
      jest.spyOn(service, 'remove').mockResolvedValue(result as never);
      expect(await controller.remove('1')).toBe(result);
    });
  });
});
