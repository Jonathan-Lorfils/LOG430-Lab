import logger from '../utils/logger.js';
import Order from '../models/Order.js';
import OrderLine from '../models/OrderLine.js';
import sequelize from '../database.js';

const OrderService = {
    async createOrder(customerId, orderLines) {
        const t = sequelize.transaction();
        try {
            const order = await Order.create(
                {
                    CustomerId: customerId,
                    totalAmount: 0,
                },
                { transaction: t }
            );

            let totalAmount = 0;
            for (const line of orderLines) {
                const orderLine = await OrderLine.create(
                    {
                        OrderId: order.id,
                        ProductId: line.ProductId,
                        quantity: line.quantity,
                        price: line.price,
                    },
                    { transaction: t }
                );
                totalAmount += orderLine.quantity * orderLine.price;
            }

            order.totalAmount = totalAmount;
            await order.save({ transaction: t });

            await t.commit();
            return order;
        } catch (error) {
            await t.rollback();
            logger.error('Error creating order:', error);
            throw error;
        }
    },

    async getOrderByCustomerId(customerId) {
        try {
            const orders = await Order.findAll({
                where: { CustomerId: customerId },
                include: [OrderLine],
            });
            return orders;
        } catch (error) {
            logger.error('Error fetching orders for customer:', error);
            throw error;
        }
    }
}

export default OrderService;