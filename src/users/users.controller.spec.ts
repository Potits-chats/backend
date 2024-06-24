import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue('create'),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create', async () => {
      const createChatDto = { email: 'test@test.com', userId: '123' };
      await usersController.create(createChatDto);
      expect(usersService.create).toHaveBeenCalledWith(createChatDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await usersController.findAll()).toEqual([]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });
});
