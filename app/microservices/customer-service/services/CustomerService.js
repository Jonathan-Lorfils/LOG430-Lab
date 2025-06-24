import sequelize from '../database.js';
import Customer from '../models/Customer.js';
import logger from '../utils/logger.js';

const CustomerService = {
    async createCustomer(customerData) {
        const t = await sequelize.transaction();
        try {
            const customer = await Customer.create(customerData, { transaction: t });
            await t.commit();
            logger.info(`Customer created with ID: ${customer.id}`);
            return customer;
        } catch (error) {
            await t.rollback();
            logger.error('Error creating customer:', error);
            throw error;
        }
    },
    async getCustomerById(customerId) {
        try {
            const customer = await Customer.findByPk(customerId);
            if (!customer) {
                throw new Error('Customer not found');
            }
            return customer;
        } catch (error) {
            logger.error('Error fetching customer:', error);
            throw error;
        }
    }
}

export default CustomerService;