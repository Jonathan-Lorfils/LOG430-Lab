import express from 'express';
import path from 'path';
import sequelize from './database.js';
import CreateFakeData from './CreateFakeData.js';
import WarehouseRouter from './routes/WarehouseRoutes.js';
import ReplenishmentRouter from './routes/ReplenishmentRoutes.js';
import StoreRouter from './routes/StoreRoutes.js';
import ParentStoreRouter from './routes/ParentStoreRoutes.js'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import ApiRouter from './api/routes/ApiRoutes.js';

// Tester la connexion à la base de données PostgreSQL
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à PostgreSQL réussie !');
    } catch (error) {
        console.error('Échec de la connexion à PostgreSQL :', error);
    }
})();

// Synchroniser les modèles avec la base de données
await sequelize.sync({ force: true });
console.log('Base de données synchronisée avec succès !');

// Générer des données factices
CreateFakeData.generate()

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Moteur de vue
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenue dans l\'application de gestion de magasin' });
}
);

app.use('/warehouse', WarehouseRouter);
app.use('/replenishment', ReplenishmentRouter);
app.use('/store', StoreRouter);
app.use('/parentStore', ParentStoreRouter)
app.use("/api/v1", ApiRouter);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`Documentation de l'API disponible sur http://localhost:${PORT}/api-docs`);
});

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
    },
    apis: ['./src/api/routes/*.js'], // adapte ce chemin selon l’endroit où sont tes routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));