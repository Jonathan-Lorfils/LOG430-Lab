import sequelize from './database.js';
import logger from './utils/logger.js';
import CreateFakeData from './CreateFakeData.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connexion to postgresql successfully !')

        logger.info('Starting database sync...')
        await sequelize.sync({ force: true });
        await CreateFakeData.generate();
        logger.info('Database synchronized successfully')

        app.listen(PORT, () => {
            logger.info(`Serveur démarré sur http://localhost:${PORT}`);
            logger.info(`Documentation disponible sur http://localhost:${PORT}/api-docs`);
            logger.info(`Métriques disponible sur http://localhost:${PORT}/metrics`)
            logger.info(`Grafaba disponible sur http://localhost:3001`)
        });

        process.exit(0);
    } catch (error) {
        logger.error('Error during database synchronization: ', error)
        process.exit(1);
    }
})();
