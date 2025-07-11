import logger from '../utils/logger.js';
import StockService from '../services/StockService.js';

const StockApiController = {
    async checkStockAvailability(req, res) {
        const stockId = req.params.stockid;
        const requestedQuantity = parseInt(req.params.quantity, 10);
        logger.info(`Request received for /api/v1/stocks/check-availability with stockId: ${stockId} and quantity: ${requestedQuantity}`);

        try {
            if (isNaN(requestedQuantity) || requestedQuantity <= 0) {
                logger.warn(`Invalid requested quantity: ${requestedQuantity} for stockId: ${stockId}`);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid requested quantity'
                });
            }

            const isAvailable = await StockService.checkStockAvailability(stockId, requestedQuantity);
            logger.info(`Stock availability checked for stockId: ${stockId}`);

            return res.status(200).json({
                success: isAvailable,
                message: 'Stock availability checked successfully',
            });

        } catch (error) {
            logger.error(`Error while checking stock availability for stockId: ${stockId}`, {
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