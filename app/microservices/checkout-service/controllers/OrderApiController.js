import logger from '../utils/logger.js';
import redis from '../utils/redisClient.js';
import OrderService from '../services/OrderService.js';

const OrderApiController = {
    async createOrder(req, res) {
        const { customerId, orderLines } = req.body;
        logger.info(`Request received for POST /api/v1/orders/createOrder with customerId: ${customerId}`);

        try {
            const order = await OrderService.createOrder(customerId, orderLines);
            logger.info(`Order created successfully for customerId: ${customerId}`, { orderId: order.id });

            await redis.del(`orders:${customerId}`);
            logger.info(`Cache for orders of customer ${customerId} invalidated after order creation`);

            return res.status(201).json({
                success: true,
                message: 'Order created successfully',
                order
            });
        } catch (error) {
            logger.error(`Error while creating order for customerId: ${customerId}`, {
                error: error.message
            });

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    async getOrderByCustomerId(req, res) {
        const customerId = req.params.customerId;
        logger.info(`Request received for GET /api/v1/orders/getOrderByCustomerId with customerId: ${customerId}`);

        try {
            const cachedOrders = await redis.get(`orders:${customerId}`);
            if (cachedOrders) {
                logger.info(`Cache hit for orders of customer ${customerId}`);
                return res.status(200).json({
                    success: true,
                    orders: JSON.parse(cachedOrders)
                });
            }

            const orders = await OrderService.getOrderByCustomerId(customerId);
            logger.info(`Orders fetched successfully for customerId: ${customerId}`, { orderCount: orders.length });

            await redis.set(`orders:${customerId}`, JSON.stringify(orders));
            logger.info(`Cache for orders of customer ${customerId} updated`);

            return res.status(200).json({
                success: true,
                orders
            });
        } catch (error) {
            logger.error(`Error while fetching orders for customerId: ${customerId}`, {
                error: error.message
            });

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    async confirmOrder(req, res) {
        const orderId = req.params.orderId;
        logger.info(`Request received for POST /api/v1/orders/confirmOrder with orderId: ${orderId}`);

        try {
            const order = await OrderService.confirmOrder(orderId);
            logger.info(`Order confirmed successfully for orderId: ${orderId}`, { order });

            return res.status(200).json({
                success: true,
                message: 'Order confirmed successfully',
                order
            });
        } catch (error) {
            logger.error(`Error while confirming order for orderId: ${orderId}`, {
                error: error.message
            });

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    async cancelOrder(req, res) {
        const orderId = req.params.orderId;
        logger.info(`Request received for POST /api/v1/orders/cancelOrder with orderId: ${orderId}`);

        try {
            const order = await OrderService.cancelOrder(orderId);
            logger.info(`Order cancelled successfully for orderId: ${orderId}`, { order });

            return res.status(200).json({
                success: true,
                message: 'Order cancelled successfully',
                order
            });
        } catch (error) {
            logger.error(`Error while cancelling order for orderId: ${orderId}`, {
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

export default OrderApiController;