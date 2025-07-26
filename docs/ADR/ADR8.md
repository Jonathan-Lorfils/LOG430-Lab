### ADR 2

### Titre

Séparation des entités Order et Sale

### Status

Accepté

### Contexte

Dans le cadre de l’évolution du système actuel afin d’y implémenter une logique de ecommerce, il est indispensable de différencier les commandes passées en ligne et celles effectuer en magasin. L’héritage n’étant pas une solution étant donné que celle-ci n’est pas stable sur l’ORM présente dans le projet.

### Décision

J’ai décidé d’introduire l’entités Order dans la logique métier :

Order : Représente une commande en ligne pouvant être potentiellement en traitement ou annulable. 

Sale : Représente une vente physique soit une transaction finale, irréversible

### Conséquence

| Avantages                                                                                                 |
| --------------------------------------------------------------------------------------------------------- |
| Facilite la compréhension de la logique métier entre les flux de commerce életronique et physique.        |
| Permet d’appliquer des règles de méétier distinces pour la gestion d’un panier vs transaction en magasin. |
| En ligne, une commande peut avoir plusieurs status différent, tandis qu’une vente physique est finale.    |
| Inconvénients                                                                                             |
| Ajoute une niveau de complexité, car il faut maintenant gérer deux entités                                |