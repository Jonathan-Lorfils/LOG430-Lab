import StoreService from '../../services/StoreService.js';
import StockService from '../../services/StockService.js';
import logger from '../../utils/logger.js';;

const StoreController = {
    async getStoreDetails(req, res) {
        logger.info('Received request for /api/v1/stores/details/:storeid');
        try {
            const storeId = req.params.storeid;
            logger.info(`Fetching details for store with ID: ${storeId}`);
            const store = await StoreService.getStoreDetailsByStoreId(storeId);
            const sales = store.Sales
            logger.info(`Fetching best-selling products for store with ID: ${storeId}`);
            const mostSoldProducts = await StoreService.getMostSoldProductsByStoreId(storeId);
            logger.info(`Fetching stock details for store with ID: ${storeId}`);
            const stocks = await StockService.getStocksByStoreId(storeId);

            logger.info(`All data fetched for store with ID: ${storeId}`)

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
            logger.error('Error while fetching store details', { error });

            return res.status(500).json({
                success: false,
                message: 'Erreur interne du serveur',
                error: error.message
            });
        }
    }
}

export default StoreController;