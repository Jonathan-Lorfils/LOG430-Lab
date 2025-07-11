import logger from '../utils/logger.js';
import StockReservationService from '../services/StockReservationService.js';

const StockReservationApiController = {
    async reserveStock(req, res) {
        const { quantity, ProductId, OrderId } = req.body;
        logger.info(`Request received for /api/v1/stock-reservations with quantity: ${quantity}, ProductId: ${ProductId}, OrderId: ${OrderId}`);
        
        try {
            if (!quantity || !ProductId || !OrderId) {
                logger.warn('Invalid request body for stock reservation creation');
                return res.status(400).json({
                    success: false,
                    message: 'Invalid request body'
                });
            }

            const stockReservation = await StockReservationService.reserveStock(quantity, ProductId, OrderId);
            logger.info(`Stock reservation created successfully for OrderId: ${OrderId}`);

            return res.status(201).json({
                success: true,
                message: 'Stock reservation created successfully',
                data: stockReservation
            });

        } catch (error) {
            logger.error('Error while creating stock reservation:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

export default StockReservationApiController;