import sequelize from '../database.js';
import StockReservation from '../models/StockReservation.js';
import logger from '../utils/logger.js';
import StockService from './StockService.js';

const StockReservationService = {
    async reserveStock(ProductId, quantity, OrderId) {
        const t = await sequelize.transaction();
        try {
            const stockReservation = await this.createStockReservation(ProductId, quantity, OrderId);

            await t.commit();
            logger.info('Stock reservation created successfully for Order:', stockReservation.OrderId);
            return stockReservation;
        } catch (error) {
            t.rollback
            logger.error('Error creating stock reservation:', error);
            throw error;
        }
    },

    async updateStockReservationStatus(id, status) {
        const t = await sequelize.transaction();
        try {
            const stockReservation = await StockReservation.findByPk(id, { transaction: t });
            if (!stockReservation) {
                throw new Error('Stock reservation not found');
            }

            stockReservation.status = status;
            await stockReservation.save({ transaction: t });

            await t.commit();
            logger.info('Stock reservation status updated successfully for ID:', id);
            return stockReservation;
        } catch (error) {
            await t.rollback();
            logger.error('Error updating stock reservation status:', error);
            throw error;
        }
    },

    async createStockReservation(ProductId, quantity, OrderId) {
        const t = await sequelize.transaction();
        try {
            const stockId = await StockService.getAvailableStockId(ProductId, quantity);

            if (!stockId) {
                logger.warn('No available stock found for ProductId:', ProductId);
                throw new Error('No available stock found');
            }

            const stockReservation = await StockReservation.create({
                quantity,
                OrderId,
                StockId: stockId
            }, { transaction: t });

            await StockService.updateStockQuantity(stockId, quantity, { transaction: t });

            await t.commit();
            logger.info('Stock reservation created and stock quantity updated successfully for Order:', OrderId);
            return stockReservation;
        } catch (error) {
            await t.rollback();
            logger.error('Error creating stock reservation and updating stock quantity:', error);
            throw error;
        }
    },

    async getStockReservationByOrderId(OrderId) {
        try {
            const stockReservations = await StockReservation.findAll({
                where: { OrderId },
            });

            return stockReservations;
        } catch (error) {
            logger.error('Error fetching stock reservations for OrderId:', OrderId, error);
            throw error;
        }
    },
}

export default StockReservationService;