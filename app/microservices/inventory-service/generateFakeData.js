import Replenishment from "./models/Replenishment.js";
import Stock from "./models/Stock.js";
import Warehouse from "./models/Warehouse.js";

const GenerateFakeData = {
    async createReplenishment(requestedQuantity, status, stockId) {
        try {
            const replenishment = await Replenishment.create({
                requestedQuantity: requestedQuantity,
                status: status,
                StockId: stockId
            });
            return replenishment;
        } catch (error) {
            console.error('Error creating replenishment:', error);
            throw error;
        }
    },

    async createStock(quantity, productId, warehouseId) {
        try {
            const stock = await Stock.create({
                quantity: quantity,
                ProductId: productId,
                WarehouseId: warehouseId
            });
            return stock;
        } catch (error) {
            console.error('Error creating stock:', error);
            throw error;
        }
    },

    async createWarehouse(name, address, parentStoreId) {
        try {
            const warehouse = await Warehouse.create({
                name: name,
                address: address,
                ParentStoreId: parentStoreId
            });
            return warehouse;
        } catch (error) {
            console.error('Error creating warehouse:', error);
            throw error;
        }
    },

    async generate(warehousesCount = 5, stocksPerWarehouse = 5, replenishmentsPerStock = 3) {
        try {
            for (let i = 0; i < warehousesCount; i++) {
                const warehouse = await this.createWarehouse(`Warehouse ${i + 1}`, `Address ${i + 1}`, i + 1);
                for (let j = 0; j < stocksPerWarehouse; j++) {
                    const stock = await this.createStock(j + 1, j + 1, warehouse.id);
                    for (let k = 0; k < replenishmentsPerStock; k++) {
                        await this.createReplenishment(k + 1, 'pending', stock.id);
                    }
                }
            }
        } catch (error) {
            console.error('Error generating fake data:', error);
            throw error;
        }
    }
};

export default GenerateFakeData;