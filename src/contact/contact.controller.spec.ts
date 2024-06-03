import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('ContactController', () => {
  let controller: ContactController;
  let service: ContactService;

  const mockMailerService = {
    sendMail: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        ContactService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call sendEmail on ContactService', async () => {
    const createContactDto = {
      nom: 'Test Name',
      email: 'test@example.com',
      message: 'Test message',
    };
    const spy = jest.spyOn(service, 'sendEmail').mockResolvedValue(undefined);

    await controller.create(createContactDto);

    expect(spy).toHaveBeenCalledWith(createContactDto);
  });
});
