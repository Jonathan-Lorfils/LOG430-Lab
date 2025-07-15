import app from './app.js';
import logger from './utils/logger.js';
import sequelize from './database.js';
import generateFakeData from './generateFakeData.js';

const PORT = process.env.PORT || 3000;

await sequelize.authenticate();
logger.info('Connexion to postgresql successfully !')

logger.info('Starting database sync...')
await sequelize.sync({ force: true });

await generateFakeData.generate();
logger.info('Database synchronized successfully')

app.listen(PORT, () => {
    logger.info(`Inventaire Service démarré sur le port 3009`);
    logger.info(`Documentation de l'API disponible à http://localhost:3009/api-docs`);
});