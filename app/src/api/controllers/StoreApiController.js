import StoreService from '../../services/StoreService.js';
import StockService from '../../services/StockService.js';
import logger from '../../utils/logger.js';
import redis from '../../utils/redisClient.js';

const StoreController = {
    async getStoreDetails(req, res) {
        const storeId = req.params.storeid;
        const cacheKey = `storeDetails:${storeId}`;

        logger.info(`Received request for /api/v1/stores/details/${storeId}`);

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                logger.info(`Returning cached details for store ID: ${storeId}`);
                return res.status(200).json({
                    success: true,
                    cached: true,
                    data: JSON.parse(cached)
                });
            }

            logger.info(`Fetching details for store with ID: ${storeId}`);
            const store = await StoreService.getStoreDetailsByStoreId(storeId);
            const sales = store.Sales;

            logger.info(`Fetching best-selling products for store with ID: ${storeId}`);
            const mostSoldProducts = await StoreService.getMostSoldProductsByStoreId(storeId);

            logger.info(`Fetching stock details for store with ID: ${storeId}`);
            const stocks = await StockService.getStocksByStoreId(storeId);

            const result = { store, sales, mostSoldProducts, stocks };

            await redis.set(cacheKey, JSON.stringify(result), 'EX', 60);
            logger.info(`Store details cached for store ID: ${storeId}`);

            return res.status(200).json({
                success: true,
                cached: false,
                data: result
            });

        } catch (error) {
            logger.error('Error while fetching store details', { error });
            return res.status(500).json({
                success: false,
                message: 'Erreur interne du serveur',
                error: error.message
            });
        }
    }
};

export default StoreController;
