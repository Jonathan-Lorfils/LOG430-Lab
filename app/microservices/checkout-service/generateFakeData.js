import Order from './models/Order.js';
import OrderLine from './models/OrderLine.js';

const GenerateFakeData = {
    async createOrder(customerId, totalAmount) {
        try {
            const order = await Order.create({
                CustomerId: customerId,
                totalAmount: totalAmount,
            });
            return order;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    async createOrderLine(orderId, productId, quantity, price) {
        try {
            const orderLine = await OrderLine.create({
                OrderId: orderId,
                ProductId: productId,
                quantity: quantity,
                price: price,
            });
            return orderLine;
        } catch (error) {
            console.error('Error creating order line:', error);
            throw error;
        }
    },

    async generate(ordersCount = 5, orderLinesPerOrder = 5) {
        try {
            for (let i = 0; i < ordersCount; i++) {
                const order = await this.createOrder(i + 1, (i + 1) * 100);
                for (let j = 0; j < orderLinesPerOrder; j++) {
                    await this.createOrderLine(order.id, j + 1, j + 1, (j + 1) * 10);
                }
            }

        } catch (error) {
            console.error('Error generating fake data:', error);
            throw error;
        }
    }
}

export default GenerateFakeData;