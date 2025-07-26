### ADR 7

### Titre

Choix de Axios comme librairie de requêtes HTTP synchrone

### Status

Accepté

### Contexte

Afin d’implémenter la logique métier de création de commande client il est nécessaire de pouvoir communiquer entre les différentes microservices de  l’application. Il est donc nécessaire de choisir une librairie de requête HTTP adapté à notre écosystème.

### Décision

J’ai choisi d’utiliser Axios comme librairie HTTP afin d’effectuer des appels synchrones entre les services.

### Conséquences

| **Avantages**                                                                 |
| ----------------------------------------------------------------------------- |
| Facile d’intégration                                                          |
| Intégration native des timeout                                                |
| Bien documenté, largement utilisé offrant ainsi beaucoup de support en ligne. |
| **Inconvénient**                                                              |
| Plus performant que la librairie http native de Node.js                       |
| Ajoute une dépendance additionnelle devant être maintenu                      |
| Plus lourd que certaines alternatives                                         |