import ParentStoreService from "../services/ParentStoreService.js";

const ParentStoreController = {
    async dashboard(req, res) {
        try {
            const storeRevenueByStore = await ParentStoreService.getAllStoreRevenue()
            const outOfStockProducts = await ParentStoreService.getAllStocksEmptyQuantityByParentStoreId();
            const trendyProducts = await ParentStoreService.getStoresMostSoldProductsByParentStoreId();

            res.render('parentStoreDashboard', {
                storeRevenueByStore,
                outOfStockProducts,
                trendyProducts
            });
        } catch (error) {
            console.error('Error fetching store revenue:', error);
            return res.status(500).send('Internal Server Error');
        }
    },
}

export default ParentStoreController;