import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  async sendMessage(message: string): Promise<AxiosResponse | void> {
    try {
      const payload = {
        content: message,
      };
      const response = await firstValueFrom(
        this.httpService.post(String(process.env.DISCORD_WEBHOOK_URL), payload),
      );
      console.log('Notification envoyée avec succès :', response.data);
      return response;
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la notification :",
        error.message,
      );
    }
  }
}
