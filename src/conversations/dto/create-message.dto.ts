export class CreateMessageDto {
  readonly userId: number;
  readonly conversationId: number;
  readonly content: string;
}
