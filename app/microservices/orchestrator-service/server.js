import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    logger.info(`Orchestrateur Service démarré sur le port ${PORT}`);
    logger.info(`Documentation disponible à http://localhost:${PORT}/api-docs`);
});