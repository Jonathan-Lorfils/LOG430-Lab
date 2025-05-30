import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const Replenishment = sequelize.define(
    'Replenishment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productStockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'product_stocks',
            key: 'id'
        }
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'parent_stores',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'replenishments',
    timestamps: true
}
);

export default Replenishment;