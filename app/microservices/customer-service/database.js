import { Sequelize } from 'sequelize';

const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:XRoot123@customer-db:5432/customerdb';
const sequelize = new Sequelize(databaseURL, {
    dialect: 'postgres',
    logging: false
})

export default sequelize;