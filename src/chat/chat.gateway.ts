import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ConversationsService } from '../conversations/conversations.service';
import { data } from 'cheerio/lib/api/attributes';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(private readonly conversationsService: ConversationsService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    // Envoie un message de bienvenue au client connecté
    // client.emit('message', 'Bienvenue sur notre chat !');
  }

  @SubscribeMessage('joinRoom')
  joinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.room);
    this.server
      .to(data.room)
      .emit('notification', `${client.id} has joined the room.`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { room: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data.room).emit('message', data.message);
  }

  // @SubscribeMessage('message')
  // async handleMessage(
  //   @MessageBody() data: any,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   console.log('🚀 ~ ChatGateway ~ handleMessage ~ data:', data);

  //   // Vérifie si 'data' est déjà un objet, sinon essaie de le parser.
  //   let messageData;
  //   if (typeof data === 'string') {
  //     try {
  //       messageData = JSON.parse(data);
  //     } catch (error) {
  //       console.error('Erreur lors du parsing de JSON:', error);
  //       return; // Arrête l'exécution en cas d'erreur de parsing
  //     }
  //   } else {
  //     // 'data' est déjà un objet, pas besoin de le parser
  //     messageData = data;
  //   }

  //   const { message, conversationId, userId, assosId, senderIsUser } =
  //     messageData;

  //   // Assurez-vous d'avoir la logique pour traiter et sauvegarder le message
  //   // Exemple : await this.conversationsService.createMessage(message, conversationId);

  //   // Envoi du message à tous les clients connectés
  //   this.server.emit('message', message);
  // }
}
