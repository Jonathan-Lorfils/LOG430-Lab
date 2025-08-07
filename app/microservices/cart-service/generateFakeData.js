import Cart from './models/Cart.js';
import CartItem from './models/CartItem.js';
import { faker } from '@faker-js/faker';
import logger from './utils/logger.js';

const GenerateFakeData = {
    async createCart(customerId) {
        try {
            const cart = await Cart.create({
                customerId: customerId,
                totalAmount: 0.0,
                status: 'active'
            });
            return cart;
        } catch (error) {
            logger.error('Error creating cart:', error);
            throw error;
        }
    },

    async createCartItem(cartId, productId, price, quantity) {
        try {
            const cartItem = await CartItem.create({
                CartId: cartId,
                ProductId: productId,
                price: price,
                quantity: quantity
            });
            return cartItem;
        } catch (error) {
            logger.error('Error creating cart item:', error);
            throw error;
        }
    },

    async generate(cartsCount = 10, itemsPerCart = 3) {
        const carts = [];
        for (let i = 0; i < cartsCount; i++) {
            const customerId = i + 1;
            const cart = await this.createCart(customerId);
            carts.push(cart);

            for (let j = 0; j < itemsPerCart; j++) {
                const productId = j + 1;
                const price = parseFloat(faker.commerce.price());
                const quantity = faker.number.int({ min: 1, max: 5 });

                await this.createCartItem(cart.id, productId, price, quantity);
            }
        }
        logger.info(`${cartsCount} fake carts with items generated successfully.`);
    },

}

export default GenerateFakeData;