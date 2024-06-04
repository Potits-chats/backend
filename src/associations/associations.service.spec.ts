import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsService } from './associations.service';
import { NotFoundException } from '@nestjs/common';

describe('AssociationsService', () => {
  let service: AssociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AssociationsService,
          useValue: {
            findOne: () => {
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<AssociationsService>(AssociationsService);
  });

  it('should be defined', () => {
    expect(service.findOne(1)).toThrow(NotFoundException);
  });
});
