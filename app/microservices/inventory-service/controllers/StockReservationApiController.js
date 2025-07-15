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

            const stockReservation = await StockReservationService.reserveStock(ProductId, quantity, OrderId);
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
    },

    async getStockReservationByOrderId(req, res) {
        const { id } = req.params;
        logger.info(`Request received for /api/v1/stock-reservations/getStockReservationByOrderId/${id}`);

        try {
            const stockReservation = await StockReservationService.getStockReservationByOrderId(id);
            if (!stockReservation || stockReservation.length === 0) {
                logger.warn(`Stock reservation not found for ID: ${id}`);
                return res.status(404).json({
                    success: false,
                    message: 'Stock reservation not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: stockReservation
            });

        } catch (error) {
            logger.error('Error while fetching stock reservation:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

export default StockReservationApiController;