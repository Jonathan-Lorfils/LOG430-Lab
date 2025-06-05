import Warehouse from "../models/Warehouse.js";
import Stock from "../models/Stock.js";
import Product from "../models/Product.js";

const WarehouseService = {
    async getWarehouseStocks() {
        try {
            const warehouse = await Warehouse.findOne({
                include: [{
                    model: Stock,
                    include: [{
                        model: Product,
                    }],
                }],
            })

            if (!warehouse) {
                throw new Error('Warehouse not found');
            }
            return warehouse;
        } catch (error) {
            console.error('Error fetching warehouse stocks:', error);
            throw error;
        }
    }
}

export default WarehouseService;