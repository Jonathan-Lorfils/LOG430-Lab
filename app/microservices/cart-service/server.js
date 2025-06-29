import app from './app.js';
import sequelize from './database.js';
import logger from './utils/logger.js';
import CreateFakeData from './createFakeData.js';

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true })
    .then(() => {
        logger.info('Base de données synchronisée avec succès');
        CreateFakeData.generateFakeData()
            .then(() => {
                logger.info('Données factices créées avec succès');
            })
            .catch((error) => {
                logger.error('Erreur lors de la création des données factices:', error);
            });
    })
    .catch((error) => {
        logger.error('Erreur lors de la synchronisation de la base de données:', error);
    });


app.listen(PORT, () => {
    logger.info(`Service de panier démarré sur le port 3005`);
    logger.info(`Documentation de l'API disponible à http://localhost:3005/api-docs`);
});