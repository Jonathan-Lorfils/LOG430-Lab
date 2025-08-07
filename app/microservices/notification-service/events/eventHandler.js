import logger from '../utils/logger.js';
import { CART_EVENTS } from '../events/eventTypes.js';

const processedEvents = new Set();

export async function handleCartEvent(event) {
    if (processedEvents.has(event.id)) return;

    try {
        let description = '';

        switch (event.type) {
            case CART_EVENTS.ARTICLE_AJOUTE:
                description = `Produit ajouté : ${event.payload.productId} au panier ${event.payload.cartId}`;
                break;

            case CART_EVENTS.ARTICLE_RETIRE:
                description = `Produit retiré : ${event.payload.productId} du panier ${event.payload.cartId}`;
                break;

            case CART_EVENTS.QUANTITE_MODIFIEE:
                description = `Quantité modifiée : produit ${event.payload.productId} à ${event.payload.quantity} dans panier ${event.payload.cartId}`;
                break;

            case CART_EVENTS.PANIER_EXPIRE:
                description = `Panier expiré : ${event.payload.cartId}`;
                break;

            case CART_EVENTS.PANIER_VIDE:
                description = `Panier vidé : ${event.payload.cartId}`;
                break;

            default:
                description = `Type d'événement inconnu : ${event.type}`;
        }

        logger.info({
            eventId: event.id,
            type: event.type,
            status: 'PROCESSED',
            consumer: 'NotificationService',
            timestamp: new Date().toISOString(),
            message: description
        });

        processedEvents.add(event.id);
    } catch (err) {
        logger.error({
            eventId: event.id,
            type: event.type,
            status: 'ERROR',
            consumer: 'NotificationService',
            timestamp: new Date().toISOString(),
            error: err.message,
            stack: err.stack
        });
    }
}
