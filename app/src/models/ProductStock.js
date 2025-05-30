import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const ProductStock = sequelize.define(
    'ProductStock', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'parent_stores',
            key: 'id'
        }
    },
    warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'warehouses',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'product_stocks',
    timestamps: true
}
);