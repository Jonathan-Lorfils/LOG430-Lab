import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const StockReservation = sequelize.define(
    'StockReservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    OrderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
}, {
    tableName: 'stock_reservations',
    timestamps: true
}
);

export default StockReservation;