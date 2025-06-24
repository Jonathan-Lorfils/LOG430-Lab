import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Service validation de commande démarré sur le port 3006`);
    logger.info(`Documentation de l'API disponible à http://localhost:3006/api-docs`);
});