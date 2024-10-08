import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('ContactService', () => {
  let service: ContactService;

  const mockMailerService = {
    sendMail: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send an email', async () => {
    const createContactDto = {
      nom: 'Test Name',
      email: 'test@example.com',
      message: 'Test message',
    };

    await service.sendEmail(createContactDto);

    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      to: 'contact@potits-chats.com',
      subject:
        'Nouveau message de contact potits-chats (' +
        process.env.NODE_ENV +
        ')',
      text: `Message de ${createContactDto.nom} (${createContactDto.email}): ${createContactDto.message}`,
      html: `<p>Message de <b>${createContactDto.nom}</b> (${createContactDto.email}): ${createContactDto.message}</p>`,
    });
  });
});
