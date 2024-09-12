<div align="center">
  <h2 align="center">Potits Chats: Backend</h2>

  <p align="center">
    Le backend de Potits Chats, une plateforme d'adoption de chats, développée avec NestJS et Prisma.
    <br />
    <br />
  </p>

  [![codecov](https://codecov.io/gh/Potits-chats/backend/graph/badge.svg?token=B7LDFW40IU)](https://codecov.io/gh/Potits-chats/backend)

</div>

## Table des Matières
<details>
  <summary>Table des Matières</summary>
  
  - [Fonctionnalités](#fonctionnalités)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
  - [Utilisation](#utilisation)
  - [Documentation](#documentation)
  - [Technologies](#technologies)
  - [Détails de l'Architecture du Projet](#détails-de-larchitecture-du-projet)
  - [Test et Validation](#test-et-validation)
  - [Linting et Formatage](#linting-et-formatage)
  - [Roadmap](#roadmap)
  - [Extensions](#extensions)
</details>

## Fonctionnalités

- ⚡️ **Performance** : Serveur rapide et scalable grâce à NestJS et Prisma.
- 🐱 **Gestion des Chats** : API complète pour gérer les données des chats disponibles à l'adoption.
- 🔒 **Sécurité** : Utilisation des JWT et de `helmet` pour sécuriser l'application.
- 💾 **Base de données** : Gestion efficace des données avec Prisma et PostgreSQL.

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [PostgreSQL](https://www.postgresql.org/) (version 14 ou supérieure)

- Serveur Frontend en cours d'exécution (voir le dépôt [frontend](https://github.com/potits-chats/frontend))

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Installation

1. Clonez le dépôt du projet :
    ```bash
    git clone https://github.com/potits-chats/backend.git
    cd backend
    ```

2. Installez les dépendances du projet :
    ```bash
    npm install
    ```

3. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement nécessaires (voir un membre de l'équipe pour obtenir les valeurs).

4. Initialisez la base de données Prisma :
    ```bash
    npx prisma db pull
    npx prisma generate
    ```

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Utilisation

Pour démarrer le serveur de développement :
    ```npm run start:dev```

Pour construire une version de production :
    ```npm run build```

Pour exécuter Prisma Studio et gérer vos données dans une interface graphique :
    ```npm run prisma:studio```

## Documentation

Pour générer la documentation Swagger, démarrez le serveur puis accédez à l'URL local `/swagger` dans votre navigateur.

Pour générer la documentation Compodoc, exécutez la commande suivante : ```npm run doc```

Pour visualiser la documentation, ouvrez le fichier `documentation/index.html` dans votre navigateur.

Il y a aussi une documentation potits-chats disponible sur le google drive de l'équipe.

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Technologies

Ce projet utilise les technologies suivantes :

| Framework/Bibliothèque | Description |
|:-----:|-------------|
| ![NestJS][NestJS-url] | Framework Node.js pour la création d'API performantes |
| ![Prisma][Prisma-url] | ORM moderne pour Node.js et TypeScript |
| ![PostgreSQL][PostgreSQL-url] | Système de gestion de base de données relationnelle |
| ![JWT][JWT-url] | Norme ouverte pour les tokens d'authentification |
| ![RxJS][RxJS-url] | Programmation réactive avec des observables |
| ![TypeScript][TypeScript-url] | Langage de programmation typé qui se compile en JavaScript |
| ![Pusher][Pusher-url] | API de messagerie en temps réel pour les applications web et mobiles |

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Détails de l'Architecture du Projet

- **src/** : Contient tout le code source de l'application.
  - **modules/** : Ce répertoire contient les modules NestJS qui sont des groupes fonctionnels de code, par exemple, `auth`, `users`, `cats`.
  - **services/** : Ce répertoire contient les services qui traitent la logique métier, tels que les appels API, les interactions avec la base de données via Prisma, etc.
  - **controllers/** : Ce répertoire contient les contrôleurs NestJS qui gèrent les routes et orchestrent les appels aux services.
  - **prisma/** : Contient les fichiers de configuration et de migration pour la base de données Prisma.

<p align="right">(<a href="#top">retour au sommet</a>)</p>


## Test et Validation

Le projet inclut des tests unitaires et end-to-end. Nous utilisons Jest pour exécuter ces tests. Vous pouvez exécuter les tests avec :
```npm run test```

Pour voir le rapport de couverture de test :

```npm run test:cov```

<p align="right">(<a href="#top">retour au sommet</a>)</p>


## Linting et Formatage

Pour garantir une haute qualité de code et maintenir la cohérence du style, nous utilisons ESLint et Prettier. Voici comment les configurer et les utiliser dans votre projet.

### Installation des Plugins

Assurez-vous que les plugins ESLint et Prettier sont installés :

2. Vérifiez que les fichiers de configuration `.eslintrc.js` et `.prettierrc` sont présents à la racine du projet.

### Exécuter ESLint

Pour analyser votre code et vérifier sa conformité avec les règles ESLint, exécutez : ```npm run lint```

Pour corriger automatiquement les erreurs et les avertissements, exécutez : ```npm run lint:fix```

<p align="right">(<a href="#top">retour au sommet</a>)</p>


## Roadmap

La feuille de route du projet est disponible sur le jira de l'équipe.

<p align="right">(<a href="#top">retour au sommet</a>)</p>

## Extensions

### Extensions Nécessaires

Les extensions suivantes sont fortement recommandées pour une meilleure expérience de développement :

- ESLint : Intégration d'ESLint pour VS Code.
- Prettier : Extension de formatage de code pour VS Code.
- Prisma : IntelliSense pour Prisma dans VS Code.

### Extensions Recommandées

Les extensions suivantes sont recommandées pour améliorer la productivité et la qualité du code :

- Path Intellisense : Autocomplétion des noms de fichiers dans VS Code.
- Auto Rename Tag : Renommage automatique des balises HTML associées.
- Turbo Console Log : Améliore le logging dans la console de débogage.

<p align="right">(<a href="#top">retour au sommet</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[NestJS-url]: https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[Prisma-url]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[PostgreSQL-url]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[JWT-url]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[RxJS-url]: https://img.shields.io/badge/RXJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white
[TypeScript-url]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Pusher-url]: https://img.shields.io/badge/Pusher-300D4F?style=for-the-badge&logo=pusher&logoColor=white

<!-- Url extensions -->
[ESLint-url]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[Prettier-url]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[Prisma-url]: https://marketplace.visualstudio.com/items?itemName=Prisma.prisma
[PathIntellisense-url]: https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense
[AutoRenameTag-url]: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag
[TurboConsoleLog-url]: https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log
