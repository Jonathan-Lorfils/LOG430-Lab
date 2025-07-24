import orderOrchestratorService from "../services/orderOrchestratorService.js"
import logger from '../../utils/logger.js';

const orderOrchestratorController = {
    async orchestrateOrder(req, res) {
        const orderDetails = req.body;
        if (!orderDetails || !orderDetails.orderId || !orderDetails.OrderLines || orderDetails.OrderLines.length === 0) {
            logger.error('Détails de la commande manquants ou invalides');
            return res.status(400).json({
                success: false,
                message: 'Détails de la commande manquants ou invalides',
            });
        }
        logger.info(`Orchestration de la commande ${orderDetails.orderId} en cours...`);

        try {
            const result = await orderOrchestratorService.orchestrateOrder(orderDetails);
            if (!result.success) {
                return res.status(500).json({
                    success: false,
                    message: result.message,
                });
            }
            logger.info(`Commande ${orderDetails.orderId} orchestrée avec succès.`);
            return res.status(200).json({
                success: true,
                message: result.message,
            });
        } catch (error) {
            logger.error(`Erreur lors de l'orchestration de la commande ${orderDetails.orderId}: ${error.message}`);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default orderOrchestratorController;