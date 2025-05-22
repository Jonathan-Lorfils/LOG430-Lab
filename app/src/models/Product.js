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
    stockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id'
        }
    }
}, {
    tableName: 'products',
    timestamps: true
}
);

// Define the association with Category
import Category from './Category.js';
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    targetKey: 'id',
    as: 'category'
});

export default Product;