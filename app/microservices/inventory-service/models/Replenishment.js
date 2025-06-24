import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const Replenishment = sequelize.define(
    'Replenishment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requestedQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    tableName: 'replenishments',
    timestamps: true
}
);

export default Replenishment;