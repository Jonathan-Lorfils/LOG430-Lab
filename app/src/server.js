import express from 'express';
import path from 'path';
import sequelize from './database.js';
import CreateFakeData from './CreateFakeData.js';
import WarehouseRouter from './routes/WarehouseRoutes.js';
import ReplenishmentRouter from './routes/ReplenishmentRoutes.js';

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à PostgreSQL réussie !');
    } catch (error) {
        console.error('Échec de la connexion à PostgreSQL :', error);
    }
})();

await sequelize.sync({ force: true });
console.log('Base de données synchronisée avec succès !');

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

// Routes
// app.use('/store', storeRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenue dans l\'application de gestion de magasin' });
}
);

app.get('/login', (req, res) => {
    const role = req.query.role;
    if (role === 'employee') {
        res.redirect('/employee/dashboard');
    } else if (role === 'manager') {
        res.redirect('/manager/dashboard');
    } else {
        res.status(400).send('Rôle inconnu.');
    }
});

app.use('/warehouse', WarehouseRouter);
app.use('/replenishment', ReplenishmentRouter);


// DB sync + start
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
});
