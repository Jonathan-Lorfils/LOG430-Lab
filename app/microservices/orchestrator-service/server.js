import app from './app.js';
import logger from './utils/logger.js';
import GenerateFakeData from './generateFakeData.js';
import sequelize from './database.js';

const PORT = process.env.PORT || 3000;

await sequelize.authenticate();
logger.info('Connexion to postgresql successfully !')

logger.info('Starting database sync...')
await sequelize.sync({ force: true });

await GenerateFakeData.generate();
logger.info('Database synchronized successfully')

app.listen(PORT, () => {
    logger.info(`Orchestrateur Service démarré sur le port 3010`);
    logger.info(`Documentation de l'API disponible à http://localhost:3010/api-docs`);
});