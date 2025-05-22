
import { Sequelize } from 'sequelize';

const databaseURL = 'postgres://postgres:XRoot123@localhost:5432/postgres'
const sequelize = new Sequelize(databaseURL, {
    logging: false
})

export default sequelize;