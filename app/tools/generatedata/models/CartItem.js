import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const CartItem = sequelize.define(
    'CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'cartItems',
    timestamps: true,
}
);

export default CartItem;