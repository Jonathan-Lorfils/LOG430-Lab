import sequelize from '../database.js';
import { DataTypes } from 'sequelize';
import Stock from './Stock.js';
import Sale from './Sale.js';

const Store = sequelize.define(
    'Store', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'stores',
    timestamps: true,
}
);

export default Store;