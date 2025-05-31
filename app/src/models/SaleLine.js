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
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'saleLines',
    timestamps: true
}
);
export default SaleLine;