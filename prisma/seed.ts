/* eslint-disable @typescript-eslint/no-unused-vars */
import { Utilisateurs } from '@prisma/client';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  // Créez des utilisateurs, des associations et des chats avec les données de votre choix
  // Utilisez les méthodes de Prisma pour créer des enregistrements dans la base de données
  const utilisateur1: Utilisateurs = await prisma.utilisateurs.create({
    data: {
      email: 'utilisateur1@example.com',
      hash: 'motdepasse',
      nom: 'Dupont',
      prenom: 'Jack',
      role: 'ADOPTANT',
      codePostal: '75000',
      ville: 'Paris',
      adresse: '1 rue de Paris',
      telephone: '0123456789',
    },
  });

  const association1 = await prisma.associations.create({
    data: {
      nom: 'Association1',
      utilisateurs: {
        connect: {
          id: utilisateur1.id, // Référencez l'utilisateur que vous avez créé précédemment
        },
      },
    },
  });

  const utilisateurAsso: Utilisateurs = await prisma.utilisateurs.create({
    data: {
      email: 'utilisateurAsso@example.com',
      hash: 'motdepasse',
      nom: 'Berd',
      prenom: 'Bernard',
      role: 'ASSOCIATION',
      codePostal: '75000',
      ville: 'Paris',
      adresse: '1 rue de Paris',
      telephone: '0123456789',
      association: {
        connect: {
          id: association1.id, // Référencez l'association que vous avez créé précédemment
        },
      },
    },
  });

  const chat1 = await prisma.chats.create({
    data: {
      nom: 'Minou',
      age: 3,
      description:
        'Tournesol est un adorable jeune chat qui a élu domicile dans le jardin d un monsieur qui a pris soin de lui en lui offrant le gîte et le couvert. Il attend maintenant une famille qui lui ouvrira son cœur pour une vie remplie de câlins et de ronrons ! Tournesol devra être adopté avec un accès à l extérieur sécurisé car il a besoin d avoir accès à un jardin. Une période d adaptation sérieuse devra être bien respectée pour éviter tout risque de fugue.1',
      sexe: 'MALE',
      taille: 'MOYEN',
      couleur: 'Tigré',
      adopte: false,
      associationId: association1.id,
      ententeChien: true,
      ententeChat: true,
      ententeEnfant: true,
      typeFoyerMaison: true,
      typeFoyerAppartement: true,
      contactTel: '0123456789',
    },
  });

  const img1 = await prisma.photos.create({
    data: {
      url: 'https://www.secondechance.org/uploads/anim/648c6bc107ba4551326684.jpg',
      chat: {
        connect: {
          id: chat1.id,
        },
      },
    },
  });

  const img2 = await prisma.photos.create({
    data: {
      url: 'https://www.secondechance.org/uploads/anim/648c6bc107300315891526.jpg',
      chat: {
        connect: {
          id: chat1.id,
        },
      },
    },
  });

  // Ajoutez d'autres enregistrements d'utilisateurs, d'associations et de chats au besoin

  console.log('Seed data ajoutée avec succès');
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
