import sequelize from './database.js';
import logger from './utils/logger.js';
import CreateFakeData from './createFakeData.js';

(async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connexion to postgresql successfully !')

        logger.info('Starting database sync...')
        await sequelize.sync({ force: true });
        await CreateFakeData.generateFakeData();
        logger.info('Database synchronized successfully')

        process.exit(0);
    } catch (error) {
        logger.error('Error during database synchronization: ', error)
        process.exit(1);
    }
})();
