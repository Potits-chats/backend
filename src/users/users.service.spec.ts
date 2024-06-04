// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';
// import { PrismaService } from '../utils/prisma.service';

// describe('UsersService', () => {
//   let service: UsersService;
//   let prisma: PrismaService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         {
//           provide: PrismaService,
//           useValue: {
//             utilisateurs: {
//               findUnique: jest.fn(),
//               findMany: jest.fn(),
//               create: jest.fn(),
//             },
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//     prisma = module.get<PrismaService>(PrismaService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('findOne', () => {
//     it('should return a single user', async () => {
//       const testEmail = 'test@test.com';
//       const findUniqueSpy = jest
//         .spyOn(prisma.utilisateurs, 'findUnique')
//         .mockResolvedValueOnce({
//           id: 1,
//           email: testEmail,
//           userId: '123',
//           associationId: 1,
//         });

//       const user = await service.findOne(testEmail);

//       expect(findUniqueSpy).toHaveBeenCalledWith({
//         where: { email: 'test@test.com' },
//       });
//       expect(user).toEqual({
//         id: 1,
//         email: testEmail,
//         userId: '123',
//         associationId: 1,
//       });
//     });
//   });
// });
