import axios from 'axios';
import logger from '../../utils/logger.js';
import { Histogram, Counter } from 'prom-client';

// === Prometheus metrics ===
const sagaDuration = new Histogram({
    name: 'saga_duration_seconds',
    help: 'Durée d’exécution des sagas en secondes',
    labelNames: ['status'],
});

const sagaSteps = new Counter({
    name: 'saga_steps_total',
    help: 'Nombre de fois où une étape a été atteinte',
    labelNames: ['step'],
});

const sagaFailures = new Counter({
    name: 'saga_failures_total',
    help: 'Nombre total d’échecs par étape',
    labelNames: ['step'],
});

const sagaCount = new Counter({
    name: 'saga_total',
    help: 'Nombre total de sagas exécutées',
    labelNames: ['status'],
});

const globalSagaFailures = new Counter({
    name: 'saga_global_failures_total',
    help: 'Nombre total de sagas échouées globalement',
});


// === Utilitaire interne ===
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
        const endTimer = sagaDuration.startTimer();

        try {
            // 1. Vérification du stock
            sagaSteps.inc({ step: 'check_stock' });
            for (const orderLine of orderDetails.OrderLines) {
                const stockCheck = await axios.get(`http://inventory-service:3000/api/v1/inventory/stocks/check-availability/${orderLine.productId}/${orderLine.quantity}`);
                if (!stockCheck.data.success) {
                    sagaFailures.inc({ step: 'check_stock' });
                    throw new Error(`Stock insuffisant pour le produit ${orderLine.productId}`);
                }
                logger.info(`Stock disponible pour le produit ${orderLine.productId}`);
            }

            await updateOrderState(orderId, 'STOCK_VERIFIED');

            // 2. Réservation du stock
            sagaSteps.inc({ step: 'reserve_stock' });
            let stockReservations = [];
            for (const orderline of orderDetails.OrderLines) {
                const stockReservation = await axios.post('http://inventory-service:3000/api/v1/inventory/stock-reservations/reserveStock', {
                    quantity: orderline.quantity,
                    ProductId: orderline.productId,
                    OrderId: orderId
                });
                if (!stockReservation.data.success) {
                    sagaFailures.inc({ step: 'reserve_stock' });
                    throw new Error(`Échec de la réservation du stock pour le produit ${orderline.productId}`);
                }
                stockReservations.push(stockReservation.data);
                logger.info(`Stock réservé pour le produit ${orderline.productId} avec succès.`);
            }

            await updateOrderState(orderId, 'STOCK_RESERVED');

            // 3. Paiement
            sagaSteps.inc({ step: 'payment' });
            const payment = await axios.post('http://payment-service:3000/api/v1/payment/process-payment', {
                amount: orderDetails.amount,
                method: 'Visa',
                OrderId: orderId
            });
            if (!payment.data.success) {
                sagaFailures.inc({ step: 'payment' });
                throw new Error('Paiement échoué');
            }

            await updateOrderState(orderId, 'PAYMENT_COMPLETED');

            // 4. Confirmation de la commande
            sagaSteps.inc({ step: 'confirm_order' });
            const orderConfirmation = await axios.post(`http://checkout-service:3000/api/v1/checkout/confirmOrder/${orderId}`);
            if (!orderConfirmation.data.success) {
                sagaFailures.inc({ step: 'confirm_order' });
                throw new Error('Échec de la confirmation de la commande');
            }

            await updateOrderState(orderId, 'CONFIRMED');

            logger.info(`Commande ${orderId} confirmée avec succès.`);
            sagaCount.inc({ status: 'success' });
            endTimer({ status: 'success' });

            return {
                success: true,
                message: `Commande ${orderId} orchestrée avec succès.`,
            };
        } catch (error) {
            logger.error(`Erreur lors de l'orchestration de la commande ${orderId}: ${error.message}`);
            sagaCount.inc({ status: 'failure' });
            globalSagaFailures.inc();
            endTimer({ status: 'failure' });

            await updateOrderState(orderId, 'CANCELLED');

            try {
                await axios.post(`http://inventory-service:3000/api/v1/inventory/stock-reservations/cancelStockReservation/${orderId}`);
                logger.info(`Réservations de stock libérées pour la commande ${orderId}`);
            } catch (releaseError) {
                logger.error(`Échec de la libération des réservations de stock pour la commande ${orderId}: ${releaseError.message}`);
            }

            try {
                await axios.post(`http://checkout-service:3000/api/v1/checkout/cancelOrder/${orderId}`);
                logger.info(`Commande ${orderId} annulée.`);
            } catch (cancelError) {
                logger.error(`Erreur lors de l'annulation de la commande ${orderId}: ${cancelError.message}`);
            }
        }
    }
};

export default OrderOrchestratorService;
