import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(() => {
    service = new PrismaService();
  });

  it('should connect on module init', async () => {
    jest.spyOn(service, '$connect').mockImplementation(async () => {});
    await service.onModuleInit();
    expect(service.$connect).toHaveBeenCalled();
  });

  it('should disconnect on module destroy', async () => {
    jest.spyOn(service, '$disconnect').mockImplementation(async () => {});
    await service.onModuleDestroy();
    expect(service.$disconnect).toHaveBeenCalled();
  });
});
