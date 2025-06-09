### ADR 3

### Titre

Choix de l’architecture

### Status

Accepté

### Contexte

Dans le cadre de ce laboratoire, l’application point de vente doit pouvoir répondre aux besoins d’une entreprise possédant cinq magasins, un centre logistique et une maison mère. La structure précédente soit une architecture client / serveur 2 tier n’est plus suffisante afin de répondre aux besoins du client.

### Décision

Faire évoluer l’architecture actuel vers une architecture client / serveur 3 tier.

#### Conséquence

Nécessite de modifier le code existant afin de convenir à cette nouvelle architecture.

Permet une meilleure séparation des responsabilités réduisant ainsi le couplage entre la logique métier et l’interface usager.

Permet une meilleure évolutivité de l’application dans notre cas, vers une possible interface web ou mobile.

Nécessite un structure du code plus stricte. 