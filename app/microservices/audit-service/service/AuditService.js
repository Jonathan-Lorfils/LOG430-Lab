import AuditLog from '../models/AuditLog.js';

export default {
    async logEvent(event) {
        await AuditLog.create({
            event_type: event.type,
            payload: event,
            service_name: event.source || 'unknown',
            aggregate_id: event.aggregateId
        });
    }
};
