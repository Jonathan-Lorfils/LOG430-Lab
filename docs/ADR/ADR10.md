### ADR 10

### Titre

Choix de PostgreSQL comme Event Store

### Status

Accepté

### Contexte

Dans l’architecture événementielle mise en place, il est nécessaire de stocker tous les événements métiers afin de permettre leur relecture et la reconstruction d’état.
Plusieurs options existent : bases spécialisées (EventStoreDB, Kafka log compaction) ou bases relationnelles.
Le choix doit prendre en compte l’infrastructure déjà en place, la simplicité d’intégration et la capacité à manipuler des données au format JSON.

### Décision

J’ai choisi d’utiliser PostgreSQL comme Event Store, en exploitant ses colonnes JSONB pour stocker les payloads d’événements.
Ce choix permet de réutiliser l’infrastructure de base de données déjà déployée dans le projet et de bénéficier de la robustesse et des fonctionnalités avancées de PostgreSQL.

### Conséquence

| **Avantages**                                                                                                |
| ------------------------------------------------------------------------------------------------------------ |
| Réutilisation de l’infrastructure existante sans ajout de service supplémentaire.                            |
| Support natif du type JSONB pour stocker des événements de manière flexible.                                 |
| Fiabilité et robustesse reconnues de PostgreSQL (transactions, durabilité).                                  |
| Facilité d’interrogation et filtrage des événements via SQL.                                                 |
| **Inconvénients**                                                                                            |
| Moins optimisé qu’une base spécialisée pour les très forts volumes d’événements.                             |
| Nécessite une implémentation manuelle des fonctions de replay et de projection.                              |
| Risque de complexité accrue si le volume d’événements devient très important (archivage et partitionnement). |