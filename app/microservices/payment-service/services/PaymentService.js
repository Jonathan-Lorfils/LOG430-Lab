import sequelize from '../database.js';
import logger from '../utils/logger.js';
import Payment from '../models/Payment.js';

const PaymentService = {
    async createPayment(amount, method, OrderId) {
        const t = await sequelize.transaction();

        try {
            const payment = await Payment.create({
                amount,
                method,
                OrderId
            }, { transaction: t });
            await t.commit();
            logger.info(`Payment created with ID: ${payment.id}`);
            return payment;
        } catch (error) {
            await t.rollback();
            logger.error(`Error processing payment: ${error.message}`);
            throw error;
        }
    },

    async processPayment(paymentId) {
        try {
            const payment = await Payment.findByPk(paymentId);
            if (!payment) {
                throw new Error('Payment not found in system');
            }

            // Simulate payment processing logic
            payment.status = 'completed';
            await payment.save();
            logger.info(`Payment processed successfully: ${payment.id}`);
            return payment;
        } catch (error) {
            logger.error(`Error processing payment: ${error.message}`);
            throw error;
        }
    },

    async getPaymentByOrderId(OrderId) {
        try {
            const payments = await Payment.findOne({
                where: { OrderId },
            });
            return payments;
        } catch (error) {
            logger.error(`Error fetching payments for Order ID ${OrderId}: ${error.message}`);
            throw error;
        }
    }
}

export default PaymentService;