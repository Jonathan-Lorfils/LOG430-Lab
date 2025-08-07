import app from './app.js';
import logger from './utils/logger.js';
import sequelize from './database.js';
import GenerateFakeData from './generateFakeData.js';

const PORT = process.env.PORT || 3000;

await sequelize.authenticate();
logger.info('Connexion to postgresql successfully !')

logger.info('Starting database sync...')
await sequelize.sync({ force: true });

await GenerateFakeData.generate();
logger.info('Database synchronized successfully')

app.listen(PORT, () => {
    logger.info(`Service de panier démarré sur le port 3005`);
    logger.info(`Documentation de l'API disponible à http://localhost:3005/api-docs`);
});