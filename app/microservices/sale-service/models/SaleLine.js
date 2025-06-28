import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const SaleLine = sequelize.define(
    'SaleLine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pricePerUnit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'saleLines',
    timestamps: true
}
);
export default SaleLine;