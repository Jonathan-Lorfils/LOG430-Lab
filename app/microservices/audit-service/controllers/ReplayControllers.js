import ReplayService from '../services/ReplayService.js';
import logger from '../utils/logger.js';

const ReplayController = {
    async replayCart(req, res) {
        logger.info(`Received replay request for cart ${req.params.cartId}`);
        try {
            const { cartId } = req.params;
            const result = await ReplayService.replayCart(cartId);

            if (!result) {
                logger.warn(`No events found for cart ${cartId}`);
                return res.status(404).json({
                    success: false,
                    message: `Cart ${cartId} not found`
                });
            }

            logger.info(`Replay successful for cart ${cartId}`);
            return res.status(200).json({
                success: true,
                data: result.state,
                meta: result.meta
            });
        } catch (err) {
            logger.error('Replay error:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: err.message
            });
        }
    }
};

export default ReplayController;
