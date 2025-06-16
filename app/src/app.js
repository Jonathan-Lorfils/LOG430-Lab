import express from 'express';
import path from 'path';
import WarehouseRouter from './routes/WarehouseRoutes.js';
import ReplenishmentRouter from './routes/ReplenishmentRoutes.js';
import StoreRouter from './routes/StoreRoutes.js';
import ParentStoreRouter from './routes/ParentStoreRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import ApiRouter from './api/routes/ApiRoutes.js';
import tokenAuth from './tokenAuth.js';
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

// Moteur de vue
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenue dans l\'application de gestion de magasin' });
});
app.use('/warehouse', WarehouseRouter);
app.use('/replenishment', ReplenishmentRouter);
app.use('/store', StoreRouter);
app.use('/parentStore', ParentStoreRouter);
app.use('/api/v1', tokenAuth, ApiRouter);
//app.use('/api/v1', ApiRouter);
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

// Swagger config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'POS API',
            version: '1.0.0',
            description: 'Documentation de l’API pour le système POS',
        },
        servers: [
            {
                url: 'http://localhost:3000',
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
    apis: ['./src/api/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
