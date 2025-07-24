import logger from '../utils/logger.js';
import PaymentService from '../services/PaymentService.js';

const PaymentController = {
    async processPayment(req, res) {
        const { amount, method, OrderId } = req.body;
        logger.info(`Processing payment for Order ID: ${OrderId} with amount: ${amount} and method: ${method}`);

        if (!amount || !method || !OrderId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            // Create payment
            logger.info(`Creating payment for Order ID: ${OrderId}`);
            const payment = await PaymentService.createPayment(amount, method, OrderId);

            // Process payment
            console.log("stockReservations:", JSON.stringify(payment, null, 2));
            const processedPayment = await PaymentService.processPayment(payment.id);

            if (!processedPayment) {
                logger.error(`Failed to process payment for Order ID: ${OrderId}`);
                return res.status(500).json({ error: 'Payment processing failed' });
            }

            return res.status(200).json({
                success: true,
                message: 'Payment processed successfully',
                payment: processedPayment
            });
        } catch (error) {
            logger.error(`Error in processAndCreatePayment: ${error.message}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getPaymentByOrderId(req, res) {
        const { OrderId } = req.params;

        if (!OrderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        try {
            const payments = await PaymentService.getPaymentByOrderId(OrderId);
            return res.status(200).json(payments);
        } catch (error) {
            logger.error(`Error fetching payments for Order ID ${OrderId}: ${error.message}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default PaymentController;