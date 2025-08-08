import AuditLog from '../models/AuditLog.js';

const ReplayService = {
    applyCart(state, evt) {
        // Normalisation légère (évite les soucis de casse/espaces/points)
        const raw = String(evt.event_type || '');
        const type = raw.replace(/\s+/g, '').replace(/\./g, ''); // ex: "cart.ItemAdded" -> "cartItemAdded"

        switch (type) {
            // Création
            case 'PANIER_CREE':
            case 'CartCreated':
                return {
                    id: evt.payload.cartId,
                    customerId: evt.payload.customerId,
                    status: 'OPEN',
                    items: [],
                    total: 0,
                    currency: evt.payload.currency || 'CAD',
                };

            // Article ajouté (inclure tes vrais noms)
            case 'ARTICLE_AJOUTE':
            case 'ItemAdded':
            case 'ArticleAjouteAuPanier': {   // <-- ajouté
                const items = [...(state.items || [])];
                const { productId, price, quantity } = evt.payload;
                const existing = items.find(i => i.productId === productId);
                if (existing) existing.quantity += quantity;
                else items.push({ productId, price, quantity });
                const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
                return { ...state, items, total };
            }

            // Quantité modifiée (inclure ton vrai nom)
            case 'QUANTITE_MODIFIEE':
            case 'ItemQuantityUpdated':
            case 'QuantiteArticleModifiee': { // <-- ajouté
                const items = [...(state.items || [])];
                const { productId, newQuantity } = evt.payload;
                const idx = productId ? items.findIndex(i => i.productId === productId) : -1;
                if (idx >= 0) items[idx] = { ...items[idx], quantity: newQuantity };
                const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
                return { ...state, items, total };
            }

            case 'ARTICLE_RETIRE':
            case 'ItemRemoved': {
                const { productId } = evt.payload;
                const items = (state.items || []).filter(i => i.productId !== productId);
                const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
                return { ...state, items, total };
            }

            case 'PANIER_VIDE':
            case 'CartEmptied':
                return { ...state, items: [], total: 0 };

            case 'PANIER_EXPIRE':
            case 'CartExpired':
            case 'CartStatusUpdated': {
                const status = (raw === 'PANIER_EXPIRE' || raw === 'CartExpired')
                    ? 'EXPIRED'
                    : (evt.payload.status || state.status);
                return { ...state, status };
            }

            default:
                return state;
        }
    },

    async replayCart(cartId) {
        const events = await AuditLog.findAll({
            where: { aggregate_id: String(cartId) },
            order: [['version', 'ASC'], ['created_at', 'ASC']]
        });
        if (!events.length) return null;

        const initial = { id: String(cartId), status: 'UNKNOWN', items: [], total: 0, currency: 'CAD' };
        const finalState = events.reduce((state, e) => this.applyCart(state, e), initial);
        const lastVersion = events[events.length - 1].version;

        return { state: finalState, meta: { eventsCount: events.length, version: lastVersion } };
    }
};

export default ReplayService;
