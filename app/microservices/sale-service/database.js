import { Sequelize } from 'sequelize';

const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:XRoot123@sales-db:5432/salesdb';
const sequelize = new Sequelize(databaseURL, {
    dialect: 'postgres',
    logging: false
})

export default sequelize;