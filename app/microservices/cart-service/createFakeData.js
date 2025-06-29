import Cart from './models/Cart.js';
import CartItem from './models/CartItem.js';
import { faker } from '@faker-js/faker';

const CreateFakeData = {
    async createCart(userId) {
        try {
            const cart = await Cart.create({
                userId: userId,
                totalPrice: 0,
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
                cartId: cartId,
                productId: productId,
                quantity: quantity,
                price: faker.commerce.price(),
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
                const userId = faker.datatype.uuid();
                const cart = await this.createCart(userId);

                for (let j = 0; j < numItemsPerCart; j++) {
                    const productId = faker.datatype.uuid();
                    const quantity = faker.datatype.number({ min: 1, max: 10 });
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