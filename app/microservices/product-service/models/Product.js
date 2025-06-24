import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

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
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'products',
    timestamps: true
}
);

export default Product;