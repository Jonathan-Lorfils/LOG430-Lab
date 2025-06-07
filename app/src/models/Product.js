import sequelize from '../database.js';
import { DataTypes } from 'sequelize';
import Stock from './Stock.js';
import SaleLine from './SaleLine.js';
import Replenishment from './Replenishment.js';

const Product = sequelize.define(
    'Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'products',
    timestamps: true
}
);

Product.hasMany(Stock);
Stock.belongsTo(Product);

Product.hasMany(SaleLine);
SaleLine.belongsTo(Product);

export default Product;