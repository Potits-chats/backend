import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from './prisma.service';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return null;
    }

    const prisma = new PrismaService();
    try {
      const decoded = jwt.decode(token);
      if (typeof decoded.sub !== 'string') {
        console.error('JWT sub claim is not a string');
        return null;
      }
      const user = await prisma.utilisateurs.findUnique({
        where: {
          userId: decoded.sub,
        },
        include: {
          association: true,
        },
      });
      return user;
    } catch (error) {
      console.error('Erreur lors de la récupération de l’utilisateur', error);
      return null;
    }
  },
);
