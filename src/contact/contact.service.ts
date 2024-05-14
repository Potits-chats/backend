import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ContactService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(createContactDto: CreateContactDto) {
    await this.mailerService.sendMail({
      to: 'contact@potits-chats.com',
      subject:
        'Nouveau message de contact potits-chats (' +
        process.env.NODE_ENV +
        ')',
      text: `Message de ${createContactDto.nom} (${createContactDto.email}): ${createContactDto.message}`,
      html: `<p>Message de <b>${createContactDto.nom}</b> (${createContactDto.email}): ${createContactDto.message}</p>`,
    });
  }
}
