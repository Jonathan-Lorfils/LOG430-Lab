import ReplenishmentService from '../../services/ReplenishmentService.js';

const ReplenishmentApiController = {
    async createRepleplenishment(req, res) {
        try {
            const stockId = req.params.stockid;
            const requestedQuantity = parseInt(req.params.quantity, 10);

            if (isNaN(requestedQuantity) || requestedQuantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantité demandée invalide'
                });
            }

            const replenishment = await ReplenishmentService.createReplenishment(stockId, requestedQuantity);

            return res.status(201).json({
                success: true,
                message: 'Réapprovisionnement créé avec succès',
                data: replenishment
            });
        } catch (error) {
            console.error('Erreur lors de la création du réapprovisionnement:', error);

            return res.status(500).json({
                success: false,
                message: 'Erreur interne du serveur',
                error: error.message
            });
        }
    }
};

export default ReplenishmentApiController;
