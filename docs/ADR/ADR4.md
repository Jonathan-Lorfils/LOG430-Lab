### ADR 2

### Titre

Implementation du patron de conception MVC

### Status

Accepté

### Contexte

Afin de répondre aux nouveaux besoins du client, il a été établi dans l’ADR précédent qu’il est nécessaire de faire évoluer l’architecture du logiciel. De plus, le fait de passer à une architecture 3 tier oblige de devoir choisir un patron de conception à suivre afin de séparer les différentes logiques de l’application.

### Décision

Adoption du patron de conception MVC :

Modèle : les entités métier contenant la logique d’accès aux données au travers de l’ORM Sequelize.

Contrôleur : Interagit avec les services métiers et renvoie la vue à l’utilisateur.

Vue : Sert d’interface utilisateur, est affiché dans le navigateur de l’utilisateur.

### Conséquence

Permet une meilleure structure du code et séparation des responsabilités

Permet une évolutivité vers une interface web ou mobile
