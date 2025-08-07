import { startConsumer } from './consumers/eventConsumer.js';
import sequelize from './database.js';

sequelize.sync()
    .then(() => console.log('Connected to audit database and models synced.'))
    .catch(err => console.error('Error syncing audit database:', err));

startConsumer();
