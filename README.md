# Boilerplate Node.JS API

Ce projet à pour but de présenter un **boilerplate** d'une API Node.JS créer avec Express.JS, Typescript, MongoDB, Mongoose, ESLint, Prettier et suivant le pattern repository.

## Installation

- Cloner le projet depuis GitHub
- Installer les dépendances avec la commande `npm install`
- Configurer les variables d'environnement en créant un fichier `.env` à la racine du projet en suivant le modèle de `.env.example`
- Lancer l'application avec la commande npm run dev

## Commandes

- `npm run dev` Lance le server en local
- `npm run build` Build le projet dans le dossier **/build**
- `npm run lint` Lance ESLint sur tout le projet
- `npm run format` Format le code avec ESLint

## Utilisation

- GET /posts : Récupérer tous les articles
- GET /posts/:id : Récupérer un article par son identifiant
- POST /posts : Créer un nouvel article
- PUT /posts/:id : Mettre à jour un article existant
- DELETE /posts/:id : Supprimer un article existant

## Configuration

Les variables d'environnement suivantes sont utilisées dans l'application :

- PORT : Le port sur lequel le serveur doit écouter (par défaut 3000)
- DB_USER : Nom de l'utilisateur pour MongoDB
- DB_PASSWORD : Mot de passe pour MongoDB
- DB_HOST : Host pour MongoDB
- DB_NAME : Nom de la base de données pour MongoDB

## License

Ce projet est sous licence MIT.
