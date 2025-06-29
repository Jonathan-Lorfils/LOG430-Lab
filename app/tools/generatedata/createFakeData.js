import Cart from './models/Cart.js'
import CartItem from './models/CartItem.js';
import { faker } from '@faker-js/faker';

const CreateFakeData = {
    async createCart(customerId) {
        try {
            const cart = await Cart.create({
                customerId: customerId,
                totalAmount: 0,
            });
            return cart;
        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    },

    async createCartItem(cartId, productId, quantity) {
        try {
            const cartItem = await CartItem.create({
                CartId: cartId,
                ProductId: productId,
                quantity: quantity,
                price: faker.commerce.price({
                    min: 1,
                    max: 100,
                    dec: 2,
                    symbol: '',
                    raw: true,
                }),
            });
            return cartItem;
        } catch (error) {
            console.error('Error creating cart item:', error);
            throw error;
        }
    },

    async generateFakeData(numCarts = 10, numItemsPerCart = 5) {
        try {
            for (let i = 0; i < numCarts; i++) {
                const userId = i;
                const cart = await this.createCart(userId);

                for (let j = 0; j < numItemsPerCart; j++) {
                    const productId = i;
                    const quantity = i + 10;
                    await this.createCartItem(cart.id, productId, quantity);
                }
            }
            console.log('Fake data created successfully');
        } catch (error) {
            console.error('Error generating fake data:', error);
        }

    }
}

export default CreateFakeData;