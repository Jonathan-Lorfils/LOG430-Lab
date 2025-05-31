import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const Stock = sequelize.define(
    'Stock', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'stocks',
    timestamps: true
}
);


export default Stock;