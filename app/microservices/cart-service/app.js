import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import ApiRouter from './routes/ApiRoutes.js';
import client from 'prom-client';
import { httpRequestDurationMicroseconds, client as promClient } from './utils/metrics.js';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        httpRequestDurationMicroseconds
            .labels(req.method, req.originalUrl, res.statusCode)
            .observe(duration);
    });
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue dans le service panier' });
});

app.use('/api/v1', ApiRouter);

// Swagger config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'POS API',
            version: '1.0.0',
            description: 'Documentation de l’API pour le service produit',
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

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Crée un Registry Prometheus
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Endpoint d’exportation Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

export default app;
