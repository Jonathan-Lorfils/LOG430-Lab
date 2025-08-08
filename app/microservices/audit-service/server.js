import { startConsumer } from './consumers/eventConsumer.js';
import sequelize from './database.js';
import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000;

await sequelize.authenticate();
logger.info('Connexion to postgresql successfully !')

logger.info('Starting database sync...')
await sequelize.sync({ force: true });

startConsumer();

app.listen(PORT, () => {
    logger.info(`Service de panier démarré sur le port 3011`);
    logger.info(`Documentation de l'API disponible à http://localhost:3011/api-docs`);
});