import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    OrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'payments',
    timestamps: true,
});

export default Payment;