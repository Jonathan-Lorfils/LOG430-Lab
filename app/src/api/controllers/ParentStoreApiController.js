import ParentStoreService from "../../services/ParentStoreService.js";
import logger from "../../utils/logger.js";

const ParentStoreApiController = {
    async getSalesStats(req, res) {
        logger.info('Request received for /api/v1/parentStore/salesStats');
        try {
            logger.info('Retrieving sales statistics for stores');
            const storeRevenueByStore = await ParentStoreService.getAllStoreRevenue();

            logger.info('Retrieving out of stock products for stores');
            const outOfStockProducts = await ParentStoreService.getAllStocksEmptyQuantityByParentStoreId();

            logger.info('Retrieving trendy products for stores');
            const trendyProducts = await ParentStoreService.getStoresMostSoldProductsByParentStoreId();

            logger.info('Successfully retrieved all store statistics');

            return res.status(200).json({
                success: true,
                data: {
                    storeRevenueByStore,
                    outOfStockProducts,
                    trendyProducts
                }
            });

        } catch (error) {
            logger.error('Error while retrieving store statistics', { error });

            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
};

export default ParentStoreApiController;
