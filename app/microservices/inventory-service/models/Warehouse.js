import sequelize from '../database.js';
import { DataTypes } from 'sequelize';
import Stock from './Stock.js';

const Warehouse = sequelize.define(
    'Warehouse', {
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
    },
    ParentStoreId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'warehouses',
    timestamps: true,
}
);

Warehouse.hasMany(Stock)
Stock.belongsTo(Warehouse);

export default Warehouse;