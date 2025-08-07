import logger from '../utils/logger.js';
import redis from '../utils/redisClient.js';
import CartService from '../services/CartService.js';

const CACHE_TTL = 60 * 5; // 5 minutes

const CartApiController = {
    async createCart(req, res) {
        const customerId = req.params.customerid;
        logger.info(`Request received for POST /api/v1/carts/createCart with customerId: ${customerId}`);

        try {
            const cart = await CartService.createCart(customerId);

            await redis.set(`cart:${cart.id}`, JSON.stringify(cart), 'EX', CACHE_TTL);

            logger.info(`Cart created successfully for customer ${customerId} with ID ${cart.id}`);
            return res.status(201).json({
                success: true,
                message: 'Cart created successfully',
                data: cart
            });
        } catch (error) {
            logger.error(`Error while creating cart for customer ${customerId}`, {
                error: error.message
            });
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    async addItemToCart(req, res) {
        const cartId = req.params.cartid;
        const { productId, price, quantity } = req.body;
        logger.info(`Request received for POST /api/v1/carts/${cartId}/addItem with productId: ${productId}, quantity: ${quantity}`);

        try {
            const cartItem = await CartService.addItemToCart(cartId, productId, price, quantity);

            // Invalide le cache du panier
            await redis.del(`cart:${cartId}`);

            logger.info(`Item added to cart ${cartId}: Product ${productId}, Quantity ${quantity}`);
            return res.status(201).json({
                success: true,
                message: 'Item added to cart successfully',
                data: cartItem
            });
        } catch (error) {
            logger.error(`Error while adding item to cart ${cartId}`, {
                error: error.message
            });
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    async deleteItemFromCart(req, res) {
        const cartId = req.params.cartid;
        const cartItemId = req.params.cartitemid;
        logger.info(`Request received for DELETE /api/v1/carts/${cartId}/deleteItem/${cartItemId}`);

        try {
            const result = await CartService.deleteItemFromCart(cartId, cartItemId);

            // Invalide le cache du panier
            await redis.del(`cart:${cartId}`);

            logger.info(`Item with ID ${cartItemId} deleted from cart ${cartId}`);
            return res.status(200).json({
                success: true,
                message: 'Item deleted from cart successfully',
                data: result
            });
        } catch (error) {
            logger.error(`Error while deleting item from cart ${cartId}`, {
                error: error.message
            });
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    async getCartByCustomerId(req, res) {
        const customerId = req.params.customerid;
        logger.info(`Request received for GET /api/v1/carts/customer/${customerId}`);

        try {
            // Vérifie le cache Redis
            const cachedCart = await redis.get(`cart:customer:${customerId}`);
            if (cachedCart) {
                logger.info(`Cache hit for customer ${customerId}`);
                return res.status(200).json({
                    success: true,
                    message: 'Cart retrieved from cache',
                    data: JSON.parse(cachedCart)
                });
            }

            const cart = await CartService.getCartByCustomerId(customerId);
            if (!cart) {
                logger.warn(`No cart found for customer ${customerId}`);
                return res.status(404).json({
                    success: false,
                    message: 'Cart not found'
                });
            }

            // Met en cache le panier
            await redis.set(`cart:customer:${customerId}`, JSON.stringify(cart), 'EX', CACHE_TTL);

            logger.info(`Cart retrieved successfully for customer ${customerId}`);
            return res.status(200).json({
                success: true,
                message: 'Cart retrieved successfully',
                data: cart
            });
        } catch (error) {
            logger.error(`Error while retrieving cart for customer ${customerId}`, {
                error: error.message
            });
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    async updateItemQuantity(req, res) {
        const { quantity, cartId, cartItemId } = req.body;
        logger.info(`Request received for PUT /api/v1/cart/updateItem/${cartItemId} with quantity: ${quantity}`);

        try {
            const updatedItem = await CartService.updateItemQuantity(cartId, cartItemId, quantity);

            if (!updatedItem) {
                logger.warn(`Item with ID ${cartItemId} not found in cart ${cartId}`);
                return res.status(404).json({
                    success: false,
                    message: 'Item not found in cart'
                });
            }

            // Invalide le cache du panier
            await redis.del(`cart:${cartId}`);

            logger.info(`Item with ID ${cartItemId} updated in cart ${cartId}`);
            return res.status(200).json({
                success: true,
                message: 'Item quantity updated successfully',
                data: updatedItem
            });
        } catch (error) {
            logger.error(`Error while updating item quantity in cart ${cartId}`, {
                error: error.message
            });
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    async updateCartStatus(req, res) {
        const { cartId, status } = req.body;
        logger.info(`Request received for PUT /api/v1/cart/updateStatus with cartId: ${cartId}, status: ${status}`);

        try {
            const updatedCart = await CartService.updateCartStatus(cartId, status);

            if (!updatedCart) {
                logger.warn(`Cart with ID ${cartId} not found`);
                return res.status(404).json({
                    success: false,
                    message: 'Cart not found'
                });
            }

            // Invalide le cache du panier
            await redis.del(`cart:${cartId}`);

            logger.info(`Cart with ID ${cartId} status updated to ${status}`);
            return res.status(200).json({
                success: true,
                message: 'Cart status updated successfully',
                data: updatedCart
            });
        } catch (error) {
            logger.error(`Error while updating cart status for cart ${cartId}`, {
                error: error.message
            });
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
};

export default CartApiController;
