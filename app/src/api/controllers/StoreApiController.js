import StoreService from '../../services/StoreService.js';
import StockService from '../../services/StockService.js';

const StoreController = {
    async getStoreDetails(req, res) {
        try {
            const storeId = req.params.storeid;
            console.log('Fetching details for store ID:', storeId);
            const store = await StoreService.getStoreDetailsByStoreId(storeId);
            const sales = store.Sales
            const mostSoldProducts = await StoreService.getMostSoldProductsByStoreId(storeId);
            const stocks = await StockService.getStocksByStoreId(storeId);

            return res.status(200).json({
                success: true,
                data: {
                    store,
                    sales,
                    mostSoldProducts,
                    stocks
                }
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération des données du tableau de bord :', error);

            return res.status(500).json({
                success: false,
                message: 'Erreur interne du serveur',
                error: error.message
            });
        }
    }
}

export default StoreController;