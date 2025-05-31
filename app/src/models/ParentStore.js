import sequelize from '../database.js';
import { DataTypes } from 'sequelize';
import Store from './Store.js';
import Warehouse from './Warehouse.js';

const ParentStore = sequelize.define(
    'ParentStore', {
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
    tableName: 'parentStores',
    timestamps: true
}
);

export default ParentStore;