import axios from 'axios';
import logger from '../../utils/logger.js';

const updateOrderState = async (orderId, newState) => {
    try {
        await axios.post(`http://checkout-service:3000/api/v1/checkout/updateOrderStatus`, {
            orderId,
            status: newState
        });
        logger.info(`État de la commande ${orderId} mis à jour à ${newState}`);
    } catch (err) {
        logger.error(`Erreur lors de la mise à jour de l'état de la commande ${orderId}: ${err.message}`);
    }
};

const OrderOrchestratorService = {
    async orchestrateOrder(orderDetails) {
        const orderId = orderDetails.orderId;

        try {
            // 1. Vérification du stock
            for (const orderLine of orderDetails.OrderLines) {
                const stockCheck = await axios.get(`http://inventory-service:3000/api/v1/inventory/stocks/check-availability/${orderLine.productId}/${orderLine.quantity}`);
                if (!stockCheck.data.success) {
                    throw new Error(`Stock insuffisant pour le produit ${orderLine.productId}`);
                }
                logger.info(`Stock disponible pour le produit ${orderLine.productId}`);
            }

            await updateOrderState(orderId, 'STOCK_VERIFIED');

            // 2. Réservation du stock
            let stockReservations = [];
            for (const orderline of orderDetails.OrderLines) {
                const stockReservation = await axios.post('http://inventory-service:3000/api/v1/inventory/stock-reservations/reserveStock', {
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

            await updateOrderState(orderId, 'STOCK_RESERVED');

            // 3. Paiement
            const payment = await axios.post('http://payment-service:3000/api/v1/payment/process-payment', {
                amount: orderDetails.amount,
                method: 'Visa',
                OrderId: orderId
            });
            if (!payment.data.success) throw new Error('Paiement échoué');

            await updateOrderState(orderId, 'PAYMENT_COMPLETED');

            // 4. Confirmation de la commande
            const orderConfirmation = await axios.post(`http://checkout-service:3000/api/v1/checkout/confirmOrder/${orderId}`);
            if (!orderConfirmation.data.success) {
                throw new Error('Échec de la confirmation de la commande');
            }

            await updateOrderState(orderId, 'CONFIRMED');

            logger.info(`Commande ${orderId} confirmée avec succès.`);
            return {
                success: true,
                message: `Commande ${orderId} orchestrée avec succès.`,
            };
        } catch (error) {
            logger.error(`Erreur lors de l'orchestration de la commande ${orderId}: ${error.message}`);

            await updateOrderState(orderId, 'CANCELLED');

            try {
                await axios.post(`http://inventory-service:3000/api/v1/inventory/stock-reservations/cancelStockReservation/${orderId}`);
                logger.info(`Réservations de stock libérées pour la commande ${orderId}`);
            } catch (releaseError) {
                logger.error(`Échec de la libération des réservations de stock pour la commande ${orderId}: ${releaseError.message}`);
            }

            try {
                await axios.post(`http://checkout-service:3000/api/v1/checkout/cancelOrder/${orderId}`);
                console.log(`Commande ${orderId} annulée.`);
            } catch (cancelError) {
                console.error(`Erreur lors de l'annulation de la commande ${orderId}: ${cancelError.message}`);
            }
        }
    }
}

export default OrderOrchestratorService;
