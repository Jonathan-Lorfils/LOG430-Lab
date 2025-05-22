import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

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

export default Category;