import ParentStoreService from '../services/ParentStoreService.js';
import StoreService from '../services/StoreService.js';
import StockService from '../services/StockService.js';

const StoreController = {
    async getAllStores(req, res) {
        try {
            const stores = await ParentStoreService.getAllStores();
            res.render('allStores', { stores });
        } catch (error) {
            console.error('Error fetching stores:', error);
            res.status(500).json({ error: 'Failed to fetch stores' });
        }
    },

    async getStoreDetails(req, res) {
        try {
            const storeId = req.params.storeid;
            const store = await StoreService.getStoreDetailsByStoreId(storeId);
            const sales = store.Sales
            const mostSoldProducts = await StoreService.getMostSoldProductsByStoreId(storeId);
            const stocks = await StockService.getStocksByStoreId(storeId);
            res.render('storeDetails', { store, sales, mostSoldProducts, stocks });
        }
        catch (error) {
            console.error('Error fetching store details:', error);
            res.status(500).json({ error: 'Failed to fetch store details' });
        }
    }
}

export default StoreController;