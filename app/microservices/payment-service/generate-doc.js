import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './utils/logger.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger config
const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'POS API',
            version: '1.0.0',
            description: 'Documentation de l’API pour le service payement',
        },
        servers: [
            {
                url: 'http://localhost',
                description: 'Serveur local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

// Générer le spec
const swaggerSpec = swaggerJsdoc(option);

// Chemin de sortie
const outputPath = path.join(__dirname, 'swagger.json');

// Sauvegarder le fichier
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

logger.info(`Swagger file generated at ${outputPath}`);
