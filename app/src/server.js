import app from './app.js';
import sequelize from './database.js';
import CreateFakeData from './CreateFakeData.js';

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à PostgreSQL réussie !');

        await sequelize.sync({ force: true });
        console.log('Base de données synchronisée avec succès !');

        await CreateFakeData.generate();

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
            console.log(`Documentation disponible sur http://localhost:${PORT}/api-docs`);
            console.log(`Métriques disponible sur http://localhost:${PORT}/metrics`)
            console.log(`Grafaba disponible sur http://localhost:3001`)
        });
    } catch (error) {
        console.error('Erreur serveur :', error);
        process.exit(1);
    }
})();
