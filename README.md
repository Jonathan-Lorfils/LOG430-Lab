# LOG430-Lab

## Description 
Ce projet renvoie une réponse contenant un message "Hello World !" à l'utilisateur lorsque celui-ci accède à l'URL. Cela est fait en lançant une instance de express puis en retournant le message lorsqu'un usager accède à la racine de l'URL.

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
