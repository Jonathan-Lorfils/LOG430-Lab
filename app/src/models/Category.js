import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Product from './Product.js';

const Category = sequelize.define(
    'Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categories',
    timestamps: true
}
);

Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products'
});
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    targetKey: 'id',
    as: 'category'
});

export default Category;