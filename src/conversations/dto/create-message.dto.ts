export class CreateMessageDto {
  contenu: string;
  utilisateursId: number;
  associationId?: number;
  conversationsId?: number;
}
