import Stock from '../models/Stock.js';
import Product from '../models/Product.js';

const StockService = {
    async getStockById(stockId) {
        const stock = await Stock.findByPk(stockId, {
            include: [Product]
        });
        if (!stock) {
            throw new Error('Stock not found');
        }
        return stock;
    },

    async getStocksByStoreId(storeId) {
        const stocks = await Stock.findAll({
            where: { StoreId: storeId },
            include: [Product]
        });
        if (stocks.length === 0) {
            throw new Error('No stocks found for this store');
        }
        return stocks;
    },
};

export default StockService;