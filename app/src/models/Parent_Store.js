import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const Parent_Store = sequelize.define(
    'Parent_Store', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'parent_stores',
    timestamps: true
}
);