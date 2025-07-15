import logger from '../utils/logger.js';
import PaymentService from '../services/PaymentService.js';

const PaymentController = {
    async processPayment(req, res) {
        logger.info('Received request to process payment');
        const { amount, method, OrderId } = req.body;

        if (!amount || !method || !OrderId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            // Create payment
            const payment = await PaymentService.createPayment(amount, method, OrderId);

            // Process payment
            const processedPayment = await PaymentService.processPayment(payment.id);

            return res.status(201).json(processedPayment);
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