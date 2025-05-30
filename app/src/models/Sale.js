import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const Sale = sequelize.define(
    'Sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'stores',
            key: 'id'
        }
    },
    subTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    saleDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'sales',
    timestamps: true
}
);