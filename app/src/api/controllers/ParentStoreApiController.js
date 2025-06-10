import ParentStoreService from "../../services/ParentStoreService.js";

const ParentStoreApiController = {
    async getSalesStats(req, res) {
        try {
            const storeRevenueByStore = await ParentStoreService.getAllStoreRevenue();
            const outOfStockProducts = await ParentStoreService.getAllStocksEmptyQuantityByParentStoreId();
            const trendyProducts = await ParentStoreService.getStoresMostSoldProductsByParentStoreId();

            return res.status(200).json({
                success: true,
                data: {
                    storeRevenueByStore,
                    outOfStockProducts,
                    trendyProducts
                }
            });

        } catch (error) {
            console.error('Erreur lors de la récupération des données du tableau de bord :', error);

            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
};

export default ParentStoreApiController;
