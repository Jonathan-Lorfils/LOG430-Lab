import { Sequelize } from 'sequelize';

const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:XRoot123@checkout-db:5432/checkoutdb';
const sequelize = new Sequelize(databaseURL, {
    dialect: 'postgres',
    logging: false
})

export default sequelize;