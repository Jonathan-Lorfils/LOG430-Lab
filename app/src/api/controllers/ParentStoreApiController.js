import ParentStoreService from "../../services/ParentStoreService.js";
import logger from "../../utils/logger.js";
import redis from "../../utils/redisClient.js"; // Assure-toi que ce fichier existe et configure Redis

const ParentStoreApiController = {
    async getSalesStats(req, res) {
        const cacheKey = 'salesStats';
        logger.info('Request received for /api/v1/parentStore/salesStats');

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                logger.info('Returning sales statistics from Redis cache');
                return res.status(200).json({
                    success: true,
                    cached: true,
                    data: JSON.parse(cached),
                });
            }

            logger.info('Retrieving sales statistics for stores');
            const storeRevenueByStore = await ParentStoreService.getAllStoreRevenue();

            logger.info('Retrieving out of stock products for stores');
            const outOfStockProducts = await ParentStoreService.getAllStocksEmptyQuantityByParentStoreId();

            logger.info('Retrieving trendy products for stores');
            const trendyProducts = await ParentStoreService.getStoresMostSoldProductsByParentStoreId();

            const result = {
                storeRevenueByStore,
                outOfStockProducts,
                trendyProducts
            };

            await redis.set(cacheKey, JSON.stringify(result), 'EX', 60);
            logger.info('Sales statistics cached in Redis');

            return res.status(200).json({
                success: true,
                cached: false,
                data: result,
            });

        } catch (error) {
            logger.error('Error while retrieving store statistics', { error });
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    },

    async updateStoreDataFake(req, res) {
        logger.info('Request received for /api/v1/parentStore/updateStoreData');

        try {
            const result = await ParentStoreService.fakeUpdate(req.body);

            // Invalidate cache
            await redis.del('salesStats');
            logger.info('Cache invalidated after store update');

            return res.status(200).json({
                success: true,
                message: 'Store data updated successfully',
                data: result
            });

        } catch (error) {
            logger.error('Error while updating store data', { error });
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }
};

export default ParentStoreApiController;
