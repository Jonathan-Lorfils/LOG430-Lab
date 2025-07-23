import axios from 'axios';
import logger from '../../../inventory-service/utils/logger.js';

const orderOrchestratorService = {
    async orchestrateOrder(orderDetails) {
        const orderId = orderDetails.orderId;

        try {
            // 1. Vérification du stock
            for (const orderLine of orderDetails.OrderLines) {
                logger.info(`Vérification du stock pour le produit ${orderLine.productId} avec la quantité ${orderLine.quantity}`);
                const stockCheck = await axios.post(`http://stock-service/api/v1/inventory/stocks/check-availability/${orderLine.productId}/${orderLine.quantity}`);

                if (!stockCheck.data.success) {
                    throw new Error(`Stock insuffisant pour le produit ${orderLine.productId}`);
                }
                logger.info(`Stock disponible pour le produit ${orderLine.productId}`);
            }

            // 2. Réservation du stock
            let stockReservations = [];
            for (const orderline of orderDetails.OrderLines) {
                const stockReservation = await axios.post('http://inventory-service/api/v1/inventory/stock-reservations/reserveStock', {
                    quantity: orderline.quantity,
                    ProductId: orderline.productId,
                    OrderId: orderId
                });
                if (!stockReservation.data.success) {
                    throw new Error(`Échec de la réservation du stock pour le produit ${orderline.productId}`);
                }
                stockReservations.push(stockReservation.data);
                logger.info(`Stock réservé pour le produit ${orderline.productId} avec succès.`);
            }

            // 3. Paiement
            const payment = await axios.post('http://payment-service/api/v1/payment/process-payment', {
                amount: orderDetails.amount,
                method: 'Visa',
                OrderId: orderId
            });
            if (!payment.data.success) throw new Error('Paiement échoué');

            // 4. Confirmation de la commande
            await axios.post(`http://checkout-service/api/v1/checkout/confirmOrder/${orderId}`);

            logger.info(`Commande ${orderId} confirmée avec succès.`);

        } catch (error) {
            console.error(`Saga échouée : ${error.message}`);

            // Compensation : libérer chaque item un par un
            for (const orderLine of orderDetails.OrderLines) {
                try {
                    await axios.post('http://stock-service/api/v1/stock/release', {
                        productId: orderLine.productId,
                        quantity: orderLine.quantity
                    });
                    logger.error(`Stock libéré pour produit ${item.productId}`);
                } catch (releaseError) {
                    logger.error(`Échec de la libération du stock pour le produit ${item.productId}: ${releaseError.message}`);
                }
            }

            // Annuler la commande
            try {
                await axios.post(`http://checkout-service/api/v1/checkout/cancelOrder/${orderId}`, {
                    reason: error.message
                });
                console.log(`Commande ${orderId} annulée.`);
            } catch (cancelError) {
                console.error(`Erreur lors de l'annulation de la commande ${orderId}: ${cancelError.message}`);
            }
        }
    }
}

export default orderOrchestratorService;
