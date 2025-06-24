import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Product Service démarré sur le port ${PORT}`);
    logger.info(`Documentation de l'API disponible à http://localhost:3001/api-docs`);
});