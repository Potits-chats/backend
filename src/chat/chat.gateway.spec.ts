import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { ConversationsService } from '../conversations/conversations.service';
import { Socket, Server } from 'socket.io';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let server: Server;

  const mockConversationsService = {
    // Ajouter des mocks pour les méthodes utilisées du ConversationsService
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        { provide: ConversationsService, useValue: mockConversationsService },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    server = {
      to: jest.fn().mockReturnThis(),
      emit: jest.fn(),
    } as unknown as Server;
    gateway.server = server;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should handle client connection', () => {
    const client = { id: '123', emit: jest.fn() } as unknown as Socket;
    console.log = jest.fn();

    gateway.handleConnection(client);

    expect(console.log).toHaveBeenCalledWith('Client connected:', client.id);
    // expect(client.emit).toHaveBeenCalledWith('message', 'Bienvenue sur notre chat !');
  });

  it('should join room and notify others', () => {
    const client = { join: jest.fn(), id: '123' } as unknown as Socket;
    const data = { room: 'room1' };

    gateway.joinRoom(data, client);

    expect(client.join).toHaveBeenCalledWith(data.room);
    expect(server.to).toHaveBeenCalledWith(data.room);
    expect(server.emit).toHaveBeenCalledWith(
      'notification',
      `${client.id} has joined the room.`,
    );
  });

  it('should handle message and broadcast it', () => {
    const data = { room: 'room1', message: 'Hello, World!' };

    gateway.handleMessage(data);

    expect(server.to).toHaveBeenCalledWith(data.room);
    expect(server.emit).toHaveBeenCalledWith('message', data.message);
  });
});
