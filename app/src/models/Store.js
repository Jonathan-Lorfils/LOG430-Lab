import sequelize from '../database.js';
import { DataTypes } from 'sequelize';
import Stock from './Stock.js';
import Sale from './Sale.js';
import Replenishment from './Replenishment.js';

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

Store.hasMany(Stock);
Stock.belongsTo(Store);

Store.hasMany(Sale);
Sale.belongsTo(Store);

export default Store;