import sequelize from '../database.js';
import { DataTypes } from 'sequelize';
import SaleLine from './SaleLine.js';

const Sale = sequelize.define(
    'Sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    saleDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'sales',
    timestamps: true
}
);

Sale.hasMany(SaleLine)
SaleLine.belongsTo(Sale);

export default Sale;