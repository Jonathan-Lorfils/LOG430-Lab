# LOG430-Lab

## Description 
Ce projet renvoie une réponse contenant un message "Hello World !" à l'utilisateur lorsque celui-ci accède à l'URL. Cela est fait en lançant une instance de express puis en retournant le message lorsqu'un usager accède à la racine de l'URL.

La pipeline CI/CD suit les instructions suivantes :
- Télécharge le code source
- Setup Node.js en version 22
- Installe les dépendances nécessaire au fonctionnement de l'application
- Exécute la commande npm run eslint afin de vérifier la qualité syntaxique et stylistique du code.
- Éxecute la commande npm run test afin de vérifier automatiquement que les tests fonctionnent.
- Se connecte à Docker à l'aide d'un token, crée une image Docker puis la pousse sur mon dépôt Docker Hub.

Pour ce qui est des choix techniques, j'ai choisi d'utiliser ces technologies étant donné que j'ai pu les utiliser lors de mon précédent stage. J'ai donc développé une certaine aisance avec celles-ci.

Lien vers pipeline : https://github.com/Jonathan-Lorfils/LOG430-Lab/actions/runs/15049100689

## Instructions d'exécution
Prérequis:
    Git
    Docker
    Docker Compose


1. Clone le projet :
   - Se placer dans le dossier destination, y ouvrir une fenêtre de terminal/invite commande puis entrer la commande suivante:
   ```
   git clone https://github.com/Jonathan-Lorfils/LOG430-Lab.git
   ```

   - Ouvrir le dossier contenant le projet avec la commande :
   
   ```
   cd LOG430-Lab
   ```

2. Lancer le container
   - Ouvrir le répertoire avec la commande suivante :

    ```
    cd app
    ```

    - Construire le conteneur
    
    ```
    docker-compose build
    ```

    - Lancer le conteneur

    ```
    docker-compose up
    ```

## Structure

```
.
├── app
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   └── index.js
│   └── test
│       └── script.test.js
└── README.md
```
