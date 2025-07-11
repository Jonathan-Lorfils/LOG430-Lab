import sequelize from '../database.js';
import logger from '../utils/logger.js';
import Stock from '../models/Stock.js';

const StockService = {
    async checkStockAvailability(productId, warehouseId, requiredQuantity) {
        try {
            const stock = await Stock.findOne({
                where: {
                    ProductId: productId,
                    StoreId: warehouseId
                }
            });

            if (!stock) {
                logger.warn(`No stock found for Product ID ${productId} in Warehouse ID ${warehouseId}`);
                return false;
            }

            if (stock.quantity >= requiredQuantity) {
                logger.info(`Stock available for Product ID ${productId} in Warehouse ID ${warehouseId}`);
                return true;
            } else {
                logger.warn(`Insufficient stock for Product ID ${productId} in Warehouse ID ${warehouseId}`);
                return false;
            }
        } catch (error) {
            logger.error(`Error checking stock availability: ${error.message}`);
            throw error;
        }
    },

    async getAvailableStockId(productId, quantity) {
        try {
            const stock = await Stock.findOne({
                where: {
                    ProductId: productId,
                    quantity: {
                        [sequelize.Op.gte]: quantity
                    }
                }
            });
            if (!stock) {
                logger.warn(`No available stock found for Product ID ${productId} with required quantity ${quantity}`);
                return null;
            }
            logger.info(`Available stock found for Product ID ${productId}: Stock ID ${stock.id}`);
            return stock.id;
        } catch (error) {
            logger.error(`Error retrieving available stock ID: ${error.message}`);
            throw error;
        }
    },

    async updateStockQuantity(stockId, quantity) {
        const t = await sequelize.transaction();
        try {
            const stock = await Stock.findByPk(stockId, { transaction: t });
            if (!stock) {
                logger.warn(`Stock with ID ${stockId} not found`);
                throw new Error('Stock not found');
            }

            const stockQuantity = parseInt(stock.quantity);
            if (stockQuantity < quantity) {
                logger.warn(`Insufficient stock quantity for Stock ID ${stockId}. Current: ${stockQuantity}, Required: ${quantity}`);
                throw new Error('Insufficient stock quantity');
            }

            stock.quantity = stockQuantity - quantity;
            await stock.save({ transaction: t });
            await t.commit();
            logger.info(`Stock quantity updated successfully for Stock ID ${stockId}. New quantity: ${stock.quantity}`);
            return stock;
        } catch (error) {
            await t.rollback();
            logger.error(`Error updating stock quantity: ${error.message}`);
            throw error;
        }
    }
}

export default StockService;