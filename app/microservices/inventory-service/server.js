import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Inventaire Service démarré sur le port 3003`);
    logger.info(`Documentation de l'API disponible à http://localhost:3003/api-docs`);
});