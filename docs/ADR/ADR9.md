### ADR 9

### Titre

Choix de RabbitMQ comme système de messagerie

### Status

Accepté

### Contexte

Dans le cadre de l’implémentation d’une architecture événementielle (Pub/Sub), il est nécessaire d'implémenter un système de messagerie fiable permettant la communication asynchrone entre les différents microservices.
Ce composant doit assurer la livraison des messages, gérer les files d’attente et supporter le routage des événements selon différents patterns.

### Décision

J’ai choisi d’utiliser RabbitMQ comme broker de messages pour la transmission d’événements métier entre microservices.

### Conséquences

| **Avantages**                                                                                     |
| ------------------------------------------------------------------------------------------------- |
| Supporte nativement plusieurs patterns de communication (Pub/Sub, work queues, routing par clés). |
| Gestion des messages persistants pour éviter toute perte en cas de panne d’un service.            |
| Documentation riche et communauté active facilitant l’intégration et le dépannage.                |
| Compatible avec de nombreux langages et protocoles (AMQP, MQTT, STOMP).                           |
| **Inconvénients**                                                                                 |
| Nécessite une infrastructure supplémentaire (service dédié à déployer et superviser).             |
| Complexité supplémentaire dans le débogage d’un système distribué asynchrone.                     |
| Nécessite la gestion des échecs et des messages en retard (dead-letter queues).                   |