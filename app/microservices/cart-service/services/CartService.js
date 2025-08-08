import logger from '../utils/logger.js';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import sequelize from '../database.js';
import { publishCartEvent } from '../events/publishCartEvent.js';
import { CART_EVENTS } from '../events/eventTypes.js';

const CartService = {
    async createCart(customerId) {
        const t = await sequelize.transaction();
        try {
            const cart = await Cart.create({ customerId }, { transaction: t });
            await t.commit();

            logger.info(`Cart created for customer ${customerId} with ID ${cart.id}`);

            return cart;
        } catch (error) {
            await t.rollback();
            logger.error('Error creating cart:', error);
            throw error;
        }
    },

    async addItemToCart(cartId, productId, price, quantity) {
        const t = await sequelize.transaction();
        try {
            const cart = await Cart.findByPk(cartId);
            if (!cart) throw new Error('Cart not found');

            const cartItem = await CartItem.create({
                CartId: cartId,
                ProductId: productId,
                price,
                quantity
            }, { transaction: t });

            cart.totalAmount += price * quantity;
            await cart.save({ transaction: t });
            await t.commit();

            logger.info(`Item added to cart ${cartId}: Product ${productId}, Quantity ${quantity}`);

            await publishCartEvent(
                CART_EVENTS.ARTICLE_AJOUTE,
                cartId,
                { productId, price, quantity, cartId }
            );

            return cartItem;
        } catch (error) {
            await t.rollback();
            logger.error('Error adding item to cart:', error);
            throw error;
        }
    },

    async updateItemQuantity(cartId, cartItemId, quantity) {
        const t = await sequelize.transaction();
        try {
            const cart = await Cart.findByPk(cartId);
            if (!cart) throw new Error('Cart not found');

            const cartItem = await CartItem.findOne({
                where: { id: cartItemId, CartId: cartId },
                transaction: t
            });

            if (!cartItem) {
                throw new Error('Cart item not found');
            }

            const oldQuantity = cartItem.quantity;
            cartItem.quantity = quantity;
            await cartItem.save({ transaction: t });

            cart.totalAmount += (quantity - oldQuantity) * cartItem.price;
            await cart.save({ transaction: t });
            await t.commit();

            logger.info(`Item ${cartItemId} quantity updated in cart ${cartId}: New quantity ${quantity}`);

            await publishCartEvent(
                CART_EVENTS.QUANTITE_MODIFIEE,
                cartId,
                { cartItemId, oldQuantity, newQuantity: quantity, cartId }
            );

            return cartItem;
        } catch (error) {
            await t.rollback();
            logger.error('Error updating item quantity in cart:', error);
            throw error;
        }
    },

    async deleteItemFromCart(cartId, cartItemId) {
        const t = await sequelize.transaction();
        try {
            const cart = await Cart.findByPk(cartId);
            if (!cart) throw new Error('Cart not found');

            const cartItem = await CartItem.findOne({
                where: { id: cartItemId, CartId: cartId },
                transaction: t
            });

            if (!cartItem) {
                throw new Error('Cart item not found');
            }

            cart.totalAmount -= cartItem.price * cartItem.quantity;
            await cart.save({ transaction: t });
            await cartItem.destroy({ transaction: t });
            await t.commit();

            logger.info(`Item ${cartItemId} deleted from cart ${cartId}`);

            await publishCartEvent(
                CART_EVENTS.ARTICLE_RETIRE,
                cartId,
                { cartItemId, productId: cartItem.ProductId, cartId }
            );
        } catch (error) {
            await t.rollback();
            logger.error('Error deleting item from cart:', error);
            throw error;
        }
    },

    async emptyCart(cartId) {
        const t = await sequelize.transaction();
        try {
            const cart = await Cart.findByPk(cartId);
            if (!cart) throw new Error('Cart not found');

            await CartItem.destroy({ where: { CartId: cartId }, transaction: t });
            cart.totalAmount = 0;
            await cart.save({ transaction: t });
            await t.commit();

            logger.info(`Cart ${cartId} emptied`);

            await publishCartEvent(
                CART_EVENTS.PANIER_VIDE,
                cartId,
                { cartId }
            );
        } catch (error) {
            await t.rollback();
            logger.error('Error emptying cart:', error);
            throw error;
        }
    },

    async getCartByCustomerId(customerId) {
        try {
            const cart = await Cart.findOne({
                where: { customerId },
                include: [{ model: CartItem }]
            });

            if (!cart) {
                logger.warn(`No cart found for customer ${customerId}`);
                return null;
            }

            logger.info(`Cart retrieved for customer ${customerId}:`, cart);
            return cart;
        } catch (error) {
            logger.error('Error retrieving cart by customer ID:', error);
            throw error;
        }
    },

    async updateCartStatus(cartId, status) {
        const t = await sequelize.transaction();
        try {
            const cart = await Cart.findByPk(cartId);
            if (!cart) throw new Error('Cart not found');

            cart.status = status;
            await cart.save({ transaction: t });
            await t.commit();

            logger.info(`Cart ${cartId} status updated to ${status}`);

            if (status === 'expired') {
                await publishCartEvent(
                    CART_EVENTS.PANIER_EXPIRE,
                    cartId,
                    { cartId, status }
                );
            }

            return cart;
        } catch (error) {
            await t.rollback();
            logger.error('Error updating cart status:', error);
            throw error;
        }
    }
};

export default CartService;
