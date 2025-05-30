import ProductStock from '../../../../../../../../ÉTS/Été 2025/LOG430/Labo 00/LOG430-Lab/app/src/models/ProductStock.js';
import sequelize from '../database.js';
import { DataTypes } from 'sequelize';

const Store = sequelize.define(
    'Store', {
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
    },
    parentStoreId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'parent_stores',
            key: 'id'
        }
    },
}, {
    tableName: 'stores',
    timestamps: true,
    freezeTableName: true,
}
);

export default Store;