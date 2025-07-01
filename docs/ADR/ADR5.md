### ADR 5

### Titre

Choix de l'architecture

### Status

Accepté

### Contexte

Dans le cadre de ce laboratoire, le système de gestion multi-magasin doit pouvoir répondre aux nouveaux besoins et intégrer des services de commerce électronique. La structure à 3 tier avec une API REST exposé n'est donc plus suffisante. 

### Décision

Faire évoluer l'architecture vers un système orienté microservice.

#### Conséquence

| **Avantages**                         | Explication                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------ |
| Scalabilité indépendante              | Chaque microservice peut être déployé et mis à l’échelle séparément selon sa charge. |
| Résilience améliorée                  | Une défaillance d’un service n’affecte pas nécessairement l’ensemble du système.     |
| Séparation claire des responsabilités | Facilite le développement parallèle.                                                 |
| **Inconvénients**                     |                                                                                      |
| Complexité opérationnelle             | Nécessite un orchestrateur (Docker).                                                 |
| Débogage plus complexe                | La distribution des responsabilités entre services rend le débogage plus complexe.   |