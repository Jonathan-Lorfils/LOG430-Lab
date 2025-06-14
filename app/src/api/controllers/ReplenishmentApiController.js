import ReplenishmentService from '../../services/ReplenishmentService.js';
import logger from '../../utils/logger.js';

const ReplenishmentApiController = {
    async createRepleplenishment(req, res) {
        const stockId = req.params.stockid;
        const requestedQuantity = parseInt(req.params.quantity, 10);
        logger.info(`Request received for /api/v1/replenishments/create with stockId: ${stockId} and quantity: ${requestedQuantity}`);
        try {
            if (isNaN(requestedQuantity) || requestedQuantity <= 0) {
                logger.warn(`Invalid requested quantity: ${requestedQuantity} for stockId: ${stockId}`);

                return res.status(400).json({
                    success: false,
                    message: 'Invalid requested quantity'
                });
            }

            const replenishment = await ReplenishmentService.createReplenishment(stockId, requestedQuantity);
            logger.info(`Replenishment successfully created for stockId: ${stockId}`);

            return res.status(201).json({
                success: true,
                message: 'Replenishment successfully created',
                data: replenishment
            });

        } catch (error) {
            logger.error(`Error while creating replenishment for stockId: ${stockId}`, {
                error: error.message
            });

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
};

export default ReplenishmentApiController;
