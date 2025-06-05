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
    }
};

export default StockService;