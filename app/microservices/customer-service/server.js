import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Client Service démarré sur le port 3004`);
    logger.info(`Documentation de l'API disponible à http://localhost:3004/api-docs`);
});