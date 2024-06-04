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
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
            update: jest.fn().mockResolvedValue({ id: 1, name: 'updated' }),
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

  describe('update', () => {
    it('should update an association and return the updated association', async () => {
      const updateAsso = {
        id: 1,
        name: 'updated',
        nom: 'name',
        url: 'url',
        ville: 'ville',
        urlImage: 'urlImage',
        description: 'description',
        tel: 'tel',
      };
      service.update = jest.fn().mockResolvedValue(updateAsso);
      expect(await controller.update('1', updateAsso)).toEqual(updateAsso);
      expect(service.update).toHaveBeenCalledWith(1, updateAsso);
    });
  });
});
