### ADR 6

### Titre

Introduction d'un API Gateway avec NGINX

### Status

Accepté

### Contexte

Avec la migration vers une architecture microservices, chaque domaine métier (produits, ventes, utilisateurs) expose désormais ses propres endpoints RESTful. Sans API Gateway, le client devrait connaître l’adresse de chaque microservice.

### Décision

Nous avons décidé d’introduire NGINX comme API Gateway. Il sera configuré pour :

- Recevoir toutes les requêtes des clients sur une seule adresse.

- Router dynamiquement les requêtes vers le microservice approprié, en fonction du chemin.

- Ajouter des en-têtes globaux (ex. Authorization, X-API-GATEWAY) pour le monitoring et la traçabilité.

### Conséquence

| **Avantages**              | Explication                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| Reduction de la complexité | Centralisation du point d’entrée pour tous les microservices.                                        |
| Évolutivité améliorée      | Possibilité d’ajouter des fonctionnalités transversales (caching, rate limiting) à l’avenir.         |
| Sécurité améliorée         | Un seul point de filtrage.                                                                           |
| **Inconvénients**          |                                                                                                      |
| Latence                    | Légère latence supplémentaire due au proxying des requêtes.                                          |
| SPOF                       | Introduit un point de défaillance unique (SPOF) si NGINX n’est pas configuré en haute disponibilité. |