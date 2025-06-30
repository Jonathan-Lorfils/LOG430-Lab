import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const OrderLine = sequelize.define(
    'OrderLine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'orderLines',
    timestamps: true,
}
);

export default OrderLine;