import logger from '../utils/logger.js';
import StockService from '../services/StockService.js';

const StockApiController = {
    async checkStockAvailability(req, res) {
        const productId = req.params.productId;
        const requestedQuantity = parseInt(req.params.requiredQty, 10);
        logger.info(`Request received for /api/v1/stocks/check-availability with stockId: ${productId} and quantity: ${requestedQuantity}`);

        try {
            if (isNaN(requestedQuantity) || requestedQuantity <= 0) {
                logger.warn(`Invalid requested quantity: ${requestedQuantity} for stockId: ${productId}`);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid requested quantity'
                });
            }

            const isAvailable = await StockService.checkStockAvailability(productId, requestedQuantity);
            logger.info(`Stock availability checked for stockId: ${productId}`);

            return res.status(200).json({
                success: isAvailable,
                message: 'Stock availability checked successfully',
            });

        } catch (error) {
            logger.error(`Error while checking stock availability for stockId: ${productId}`, {
                error: error.message
            });

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

export default StockApiController;