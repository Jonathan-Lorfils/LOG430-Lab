import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import CartItem from './CartItem.js';

const Cart = sequelize.define(
    'Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    }
}, {
    tableName: 'carts',
    timestamps: true,
}
);

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart);

export default Cart;