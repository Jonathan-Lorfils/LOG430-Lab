import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        app.listen(PORT, () => {
            logger.info(`Serveur démarré`);
        });
    } catch (error) {
        logger.error('Erreur serveur :', error);
        process.exit(1);
    }
})();
