import Replenishment from '../models/Replenishment.js';
import sequelize from '../database.js';

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
            return replenishment;
        } catch (error) {
            await t.rollback();
            console.error('Error creating replenishment:', error);
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

        return replenishment;
    }
};

export default ReplenishmentService;