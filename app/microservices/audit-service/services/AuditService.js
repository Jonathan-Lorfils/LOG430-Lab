import sequelize from '../database.js';
import AuditLog from '../models/AuditLog.js';

function inferAggregateType(eventType, fallback = 'Unknown') {
    // Exemple : "CartCreated" -> "Cart" ; "OrderPaid" -> "Order"
    const m = /^([A-Z][a-zA-Z0-9]+?)[A-Z]/.exec(eventType || '');
    return m ? m[1] : fallback;
}

export default {
    async logEvent(event) {
        // Compat: supporte { type, payload, aggregateId, source }
        const eventType = event.type || event.eventType;
        const aggregateId = event.aggregateId || event.payload?.cartId || event.payload?.aggregateId;
        const aggregateType = event.aggregateType || ((event.source || '').toLowerCase().includes('cart') ? 'Cart' : 'Unknown');
        const serviceName = event.source || 'audit-service';

        if (!eventType) throw new Error('event.type (ou eventType) est requis');
        if (!aggregateId) throw new Error('aggregateId est requis (ex: payload.cartId)');

        return sequelize.transaction(async (t) => {
            // 1) Lire la version courante
            const current = await AuditLog.max('version', {
                where: { aggregate_id: aggregateId, aggregate_type: aggregateType },
                transaction: t
            });
            const currentVersion = current || 0;

            // 2) Calculer la prochaine version
            const nextVersion = currentVersion + 1;

            // 3) Insérer l’événement
            return AuditLog.create({
                aggregate_id: aggregateId,
                aggregate_type: aggregateType,
                version: nextVersion,
                event_type: eventType,
                payload: event.payload ?? event.data ?? {}, // données métier
                service_name: serviceName
            }, { transaction: t });
        });
    }
};
