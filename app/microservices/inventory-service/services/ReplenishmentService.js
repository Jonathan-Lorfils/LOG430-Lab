import Replenishment from '../models/Replenishment.js';
import sequelize from '../database.js';
import logger from '../utils/logger.js';

const ReplenishmentService = {
    async createReplenishment(stockid, requestedQuantity) {
        const t = await sequelize.transaction();
        try {
            const replenishment = await Replenishment.create({
                StockId: stockid,
                requestedQuantity: requestedQuantity,
                status: 'pending'
            }, { transaction: t });

            await t.commit();
            logger.info('Replenishment created successfully for Stock:', replenishment.StockId);
            return replenishment;
        } catch (error) {
            await t.rollback();
            logger.error('Error creating replenishment:', error);
            throw error;
        }
    },

    async updateReplenishmentStatus(replenishmentId, status) {
        const replenishment = await Replenishment.findByPk(replenishmentId);
        if (!replenishment) {
            throw new Error('Replenishment not found');
        }

        replenishment.status = status;
        await replenishment.save();
        logger.info(`Replenishment status updated to ${status} for ID:`, replenishmentId);
        return replenishment;
    }
};

export default ReplenishmentService;