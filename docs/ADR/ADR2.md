# ADR 2

# Titre 

Stratégie de persistence

## Status

Accepted

## Contexte

Dans le cadre de ce laboratoire, l’application point de vente (POS) doit pouvoir manipuler les données des différents produits et catégories, ainsi que sauvegardés celle-ci de manière fiable et durable.

## Décision

J’ai choisi d’opter pour l’ORM Sequelize afin de gérer les interactions entre mon application et la base de données postgreSQL. 

## Consequences

Sequelize prend en charge la création de schéma ainsi que des relations rendant le développement plus facile

Sequelize prend en charge la synchronization des tables soit va effectuer les modifications nécessaire dans la base données si des modifications ont eu lieu dans le code.

Sequelize s’occupe de l’abstraction des requêtes SQL évitant de devoir écrire et exécuter chaque requête soi-même.