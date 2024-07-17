import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Sexe, Taille } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockPrismaService = {
      utilisateurs: {
        create: jest
          .fn()
          .mockImplementation((dto) =>
            Promise.resolve({ id: Date.now(), ...dto }),
          ),
        findMany: jest.fn().mockResolvedValue([]),
        findUnique: jest.fn().mockImplementation((where) =>
          Promise.resolve({
            id: where.where.id,
            name: 'Test User',
            email: 'test@example.com',
          }),
        ),
        update: jest
          .fn()
          .mockImplementation((params) =>
            Promise.resolve({ id: params.where.id, ...params.data }),
          ),
        delete: jest
          .fn()
          .mockImplementation((where) =>
            Promise.resolve({ id: where.where.id }),
          ),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'PrismaService',
          useValue: mockPrismaService,
        },
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockRejectedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            findOneById: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const result = {
        id: 0,
        nom: '',
        url: '',
        ville: '',
        urlImage: '',
        description: '',
        tel: '',
        chats: {
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
          association: [],
          photos: [{ id: 1, createdAt: undefined, url: '', chatId: 1 }],
        },
        conversations: {
          id: 0,
          association: [],
          utilisateur: [],
          messages: [],
          associationsId: 0,
          utilisateursId: 0,
        },
        utilisateurs: {
          id: 0,
          email: '',
          userId: '',
          nom: 'test',
          img: 'https://geekflare.com/fr/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg',
          associationId: 0,
          conversations: [],
          favoris: [],
          association: [],
          messages: [],
        },
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await service.findOne('')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userDto = {
        name: 'Test User',
        email: 'test@example.com',
        userId: '1',
        associationId: 1,
        nom: 'test',
        img: 'https://geekflare.com/fr/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg',
      };
      const result = { id: 1, ...userDto };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await service.create(userDto)).toEqual(result);
    });
  });

  describe('findOneById', () => {
    it('should return one user by id', async () => {
      const userId = 1;
      const expectedUser = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        userId: '1',
        associationId: 1,
        nom: 'test',
        img: 'https://geekflare.com/fr/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg',
      };

      jest.spyOn(service, 'findOneById').mockResolvedValue(expectedUser);
      const result = await service.findOneById(userId);
      expect(result).toEqual(result);
    });
  });
});
