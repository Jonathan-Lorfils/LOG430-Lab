import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import OrderLine from './OrderLine.js';

const Order = sequelize.define(
    'Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'created',
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'orders',
    timestamps: true,
}
);

Order.hasMany(OrderLine)
OrderLine.belongsTo(Order);

export default Order;