import logger from '../utils/logger.js';
import CustomerService from '../services/CustomerService.js';

const CustomerApiController = {
    async createCustomer(req, res) {
        const customerData = req.body;
        logger.info('Request received for /api/v1/customers/create', { customerData });

        try {
            const customer = await CustomerService.createCustomer(customerData);
            logger.info(`Customer successfully created with ID: ${customer.id}`);

            return res.status(201).json({
                success: true,
                message: 'Customer successfully created',
                data: customer
            });
        } catch (error) {
            logger.error('Error while creating customer:', { error: error.message });

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    async getCustomerById(req, res) {
        const customerId = req.params.id;
        logger.info(`Request received for /api/v1/customers/${customerId}`);

        try {
            const customer = await CustomerService.getCustomerById(customerId);
            logger.info(`Customer successfully fetched with ID: ${customer.id}`);

            return res.status(200).json({
                success: true,
                message: 'Customer successfully fetched',
                data: customer
            });
        } catch (error) {
            logger.error(`Error while fetching customer with ID ${customerId}:`, { error: error.message });

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

export default CustomerApiController;