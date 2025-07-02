import sequelize from '../database.js';
import { DataTypes } from 'sequelize';
import Replenishment from './Replenishment.js';

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
    },
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    StoreId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'stocks',
    timestamps: true
}
);

Stock.hasMany(Replenishment);
Replenishment.belongsTo(Stock);

export default Stock;