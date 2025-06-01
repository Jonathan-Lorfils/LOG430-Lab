import sequelize from '../database.js';

const ReplenishmentService = {
    async createReplenishment(storeId, productId, requestedQuantity) {
        const Replenishment = sequelize.models.Replenishment;
        const Stock = sequelize.models.Stock;

        // Find the stock for the given store and product
        const stock = await Stock.findOne({
            where: {
                storeId: storeId,
                productId: productId
            }
        });

        if (!stock) {
            throw new Error('Stock not found for the given store and product');
        }

        // Create a new replenishment record
        const replenishment = await Replenishment.create({
            stockId: stock.id,
            requestedQuantity: requestedQuantity,
            status: 'pending'
        });

        return replenishment;
    }
};

export default ReplenishmentService;