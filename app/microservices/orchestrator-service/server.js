// server.js
import app from './app.js';
import logger from './utils/logger.js';
import { connectRabbitMQ } from './eventPublisher.js';

const PORT = process.env.PORT || 3010;

const startServer = async () => {
    try {
        await connectRabbitMQ();
        app.listen(PORT, () => {
            logger.info(`Orchestrateur Service démarré sur le port ${PORT}`);
            logger.info(`Documentation disponible à http://localhost:${PORT}/api-docs`);
            logger.info('RabbitMQ: http://localhost:15672 (utilisateur: guest, mot de passe: guest)');
        });
    } catch (err) {
        logger.error('Échec au démarrage du service orchestrateur :', err);
        process.exit(1);
    }
};

startServer();
